import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, Clock, Users, CalendarDays, LogOut } from 'lucide-react';
import lnmiitLogo from '@/assets/lnmiit-logo.png';

interface BusRoute {
  id: string;
  busNumber: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  bookedSeats: number;
}

const mockBuses: BusRoute[] = [
  {
    id: '1',
    busNumber: 'CB-101',
    departureTime: '08:00 AM',
    arrivalTime: '08:45 AM',
    totalSeats: 40,
    bookedSeats: 28
  },
  {
    id: '2',
    busNumber: 'CB-102',
    departureTime: '08:30 AM',
    arrivalTime: '09:15 AM',
    totalSeats: 40,
    bookedSeats: 35
  },
  {
    id: '3',
    busNumber: 'CB-103',
    departureTime: '07:45 AM',
    arrivalTime: '08:30 AM',
    totalSeats: 40,
    bookedSeats: 22
  },
  {
    id: '4',
    busNumber: 'CB-104',
    departureTime: '09:00 AM',
    arrivalTime: '09:45 AM',
    totalSeats: 40,
    bookedSeats: 40
  },
  {
    id: '5',
    busNumber: 'CB-105',
    departureTime: '10:00 AM',
    arrivalTime: '10:45 AM',
    totalSeats: 40,
    bookedSeats: 15
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  const handleBookSeat = (busId: string) => {
    navigate(`/book-seat/${busId}`);
  };

  const getAvailabilityBadge = (booked: number, total: number) => {
    const available = total - booked;
    if (available === 0) {
      return <Badge variant="destructive">Full</Badge>;
    } else if (available <= 5) {
      return <Badge className="bg-amber-500 hover:bg-amber-600">Limited</Badge>;
    } else {
      return <Badge className="bg-green-600 hover:bg-green-700">Available</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={lnmiitLogo} alt="LNMIIT Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-foreground">LNMIIT Bus Booking</h1>
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to LNMIIT! 
          </h2>
          <p className="text-muted-foreground">
            The LNM Institute of Information Technology - Select a bus route to view seat availability and make your booking
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer" onClick={() => navigate('/my-bookings')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-sm text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover:border-accent/40 transition-colors cursor-pointer" onClick={() => navigate('/timetable')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Timetable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-accent">View</p>
              <p className="text-sm text-muted-foreground">Complete schedule</p>
            </CardContent>
          </Card>

          <Card className="border-green-600/20 hover:border-green-600/40 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Waiting List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-muted-foreground">Pending requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Available Buses */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-4">Available Buses</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockBuses.map((bus) => (
            <Card 
              key={bus.id} 
              className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                selectedBus === bus.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedBus(bus.id)}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">Bus No: {bus.busNumber}</CardTitle>
                  {getAvailabilityBadge(bus.bookedSeats, bus.totalSeats)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Departure</p>
                      <p className="font-semibold">{bus.departureTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Arrival</p>
                      <p className="font-semibold">{bus.arrivalTime}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-muted-foreground">Seat Availability</p>
                      <p className="text-sm font-semibold">
                        {bus.totalSeats - bus.bookedSeats} / {bus.totalSeats}
                      </p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${((bus.totalSeats - bus.bookedSeats) / bus.totalSeats) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookSeat(bus.id);
                    }}
                    disabled={bus.bookedSeats >= bus.totalSeats}
                  >
                    {bus.bookedSeats >= bus.totalSeats ? 'Join Waiting List' : 'Book Seat'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
