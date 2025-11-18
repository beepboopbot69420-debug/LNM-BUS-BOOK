import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bus, Calendar, MapPin, Clock, Ticket, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import lnmiitLogo from '@/assets/lnmiit-logo.png';
import apiFetch from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Booking {
  _id: string; // Changed from id to _id
  busNumber: string;
  route: string;
  seatNumber: number;
  departureTime: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'attended' | 'absent'; // UPDATED
}

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to render status badges
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-600 hover:bg-blue-700">Confirmed</Badge>;
      case 'attended':
        return <Badge className="bg-green-600 hover:bg-green-700">Attended</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">Unknown Status</Badge>;
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const data: Booking[] = await apiFetch('/bookings/mybookings');
      // --- FIX: Filter out CANCELLED bookings but keep CONFIRMED, ATTENDED, and ABSENT ---
      setBookings(data.filter(b => b.status !== 'cancelled')); 
    } catch (error: any) {
      toast.error(`Failed to fetch bookings: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id: string) => {
    try {
      await apiFetch(`/bookings/${id}`, {
        method: 'DELETE',
      });
      toast.success('Booking cancelled successfully!');
      fetchBookings(); // Refresh the list
    } catch (error: any) {
      toast.error(`Failed to cancel booking: ${error.message}`);
    }
  };

  // Filter for only 'confirmed' bookings to count active ones for the badge
  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/student-dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={lnmiitLogo} alt="LNMIIT Logo" className="h-16 w-auto" />
                  <div>
                    <CardTitle className="text-3xl mb-2">My Bookings</CardTitle>
                    <CardDescription className="text-base">
                      Manage your LNMIIT bus seat reservations
                    </CardDescription>
                  </div>
                </div>
                <Badge className="text-lg px-4 py-2">
                  {isLoading ? '...' : activeBookingsCount} Confirmed
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card key={booking._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* --- Dynamic Card Border Color based on Status --- */}
                <div className="h-2" style={{
                    backgroundColor: booking.status === 'confirmed' ? '#2563EB' : 
                                     booking.status === 'attended' ? '#16A34A' : 
                                     booking.status === 'absent' ? '#DC2626' : 'gray' 
                  }} />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Bus className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{booking.busNumber}</h3>
                        <p className="text-muted-foreground">{booking.route}</p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Seat Number</p>
                          <p className="font-bold text-lg">{booking.seatNumber}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pickup Point</p>
                          <p className="font-semibold">{booking.route.split('→')[0].trim()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Departure Time</p>
                          <p className="font-bold text-accent">{booking.departureTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <div>
                          <p className="text-sm text-muted-foreground">Booking Date</p>
                          <p className="font-semibold">
                            {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate('/timetable')}
                    >
                      View Timetable
                    </Button>
                    
                    {/* --- CONDITIONAL CANCEL BUTTON (Only for Confirmed bookings) --- */}
                    {booking.status === 'confirmed' && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="flex-1">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently cancel your booking for seat {booking.seatNumber} on bus {booking.busNumber}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Back</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelBooking(booking._id)}>
                              Yes, Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  
                  {/* --- CONDITIONAL MESSAGE --- */}
                  {booking.status === 'confirmed' ? (
                     <p className="text-xs text-muted-foreground text-center mt-3">
                       Cancellation allowed up to 30 minutes before departure
                     </p>
                  ) : (
                     <p className="text-xs text-muted-foreground text-center mt-3 font-semibold text-green-700 dark:text-green-400">
                       Attendance marked. Booking remains visible for review.
                     </p>
                  )}
                 
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="py-12">
              <CardContent className="text-center">
                <Bus className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-bold mb-2">No Active Bookings</h3>
                <p className="text-muted-foreground mb-6">
                  You do not have any confirmed or recently marked bookings.
                </p>
                <Button 
                  onClick={() => navigate('/student-dashboard')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Browse Available Buses
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;