import asyncHandler from 'express-async-handler';
import Bus from '../models/busModel.js';
import Booking from '../models/bookingModel.js';
import User from '../models/userModel.js'; 
import WaitingList from '../models/waitingListModel.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse';

// --- HELPER FUNCTION ---
const parseTime = (timeStr) => {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};
// --- END HELPER FUNCTION ---

// @desc    Get dashboard stats (Filtered by time, but keeps Assets)
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getDashboardStats = asyncHandler(async (req, res) => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const allBuses = await Bus.find({});
  
  // Keep bus if: It's upcoming OR it's a placeholder (Asset)
  const activeRecords = allBuses.filter(bus => 
    bus.route === 'New Asset (Placeholder)' || 
    parseTime(bus.departureTime) > currentMinutes
  );
  const activeBusIds = activeRecords.map(bus => bus._id);

  // Calculate totalBuses (Unique Assets)
  const uniqueBuses = await Bus.aggregate([
    { $match: { _id: { $in: activeBusIds } } },
    { $group: { _id: '$busNumber' } },
    { $count: 'totalUniqueBuses' }
  ]);
  const totalBuses = uniqueBuses.length > 0 ? uniqueBuses[0].totalUniqueBuses : 0;

  const totalBookings = await Booking.countDocuments({ 
    bus: { $in: activeBusIds },
    status: { $in: ['confirmed', 'attended', 'absent'] } 
  });
  
  const totalWaiting = await WaitingList.countDocuments({ bus: { $in: activeBusIds } });
  
  // Only count capacity of real upcoming trips, not placeholders
  const realTrips = activeRecords.filter(b => b.route !== 'New Asset (Placeholder)');
  const totalCapacity = realTrips.reduce((acc, bus) => acc + bus.totalSeats, 0);
  
  const occupancyRate = totalCapacity > 0 ? ((totalBookings / totalCapacity) * 100).toFixed(0) : 0;

  res.json({
    totalBuses, 
    totalBookings,
    totalWaiting,
    totalCapacity,
    occupancyRate
  });
});

// @desc    Download report
// @route   GET /api/admin/report
// @access  Private (Admin)
const downloadReport = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('bus', 'busNumber route');
    
  if (!bookings || bookings.length === 0) {
    res.status(404);
    throw new Error('No bookings found to generate report');
  }

  const data = bookings.map(b => ({
    'Booking ID': b._id,
    'Student Name': b.user.name,
    'Student Email': b.user.email,
    'Bus Number': b.bus.busNumber,
    'Route': b.bus.route,
    'Seat Number': b.seatNumber,
    'Status': b.status,
    'Date': b.bookingDate.toISOString().split('T')[0],
  }));

  const { type = 'pdf' } = req.query;

  if (type === 'csv') {
    const csv = Papa.unparse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment('bookings_report.csv');
    res.send(csv);
  } else {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Booking ID', 'Student', 'Bus', 'Seat', 'Status', 'Date']],
      body: data.map(b => [b['Booking ID'], b['Student Name'], b['Bus Number'], b['Seat Number'], b['Status'], b['Date']]),
    });
    const pdfData = doc.output();
    res.header('Content-Type', 'application/pdf');
    res.attachment('bookings_report.pdf');
    res.send(Buffer.from(pdfData, 'binary'));
  }
});

// @desc    Get all conductor users
// @route   GET /api/admin/conductors
// @access  Private (Admin)
const getConductors = asyncHandler(async (req, res) => {
  const conductors = await User.find({ role: 'conductor' }).select('_id name phone');
  res.json(conductors);
});

// @desc    Get all bus schedules (UPCOMING + Placeholders for Admin)
// @route   GET /api/admin/buses/all
// @access  Private (Admin)
const getAllBusSchedules = asyncHandler(async (req, res) => {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const allBuses = await Bus.find({}).populate('conductor', 'name phone');
  
  // Keep Placeholders AND Upcoming trips
  const activeRecords = allBuses.filter(bus => 
    bus.route === 'New Asset (Placeholder)' || 
    parseTime(bus.departureTime) > currentMinutes
  );

  const busesWithCounts = await Promise.all(activeRecords.map(async (bus) => {
      const bookings = await Booking.aggregate([
          { $match: { bus: bus._id, status: { $in: ['confirmed', 'attended', 'absent'] } } },
          { $group: { _id: null, bookedSeats: { $sum: 1 } } }
      ]);
      
      return {
          id: bus._id,
          busNumber: bus.busNumber,
          route: bus.route,
          departureTime: bus.departureTime,
          arrivalTime: bus.arrivalTime,
          totalSeats: bus.totalSeats,
          bookedSeats: bookings.length > 0 ? bookings[0].bookedSeats : 0,
          driver: bus.driver,
          conductor: bus.conductor,
      };
  }));

  res.json(busesWithCounts);
});

export { getDashboardStats, downloadReport, getConductors, getAllBusSchedules };