import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import lnmiitLogo from '@/assets/lnmiit-logo.png';

interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

const BookSeat = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  
  // Generate 40 seats (8 rows x 5 seats, with aisle)
  const [seats, setSeats] = useState<Seat[]>(() => {
    const seatArray: Seat[] = [];
    let seatNumber = 1;
    
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 4; col++) {
        const randomBooked = Math.random() > 0.6;
        seatArray.push({
          id: `${row}-${col}`,
          row,
          number: seatNumber++,
          status: randomBooked ? 'booked' : 'available'
        });
      }
    }
    
    return seatArray;
  });

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') {
      toast.error('This seat is already booked');
      return;
    }

    setSeats(prev => prev.map(s => ({
      ...s,
      status: s.id === seat.id ? 'selected' : (s.status === 'selected' ? 'available' : s.status)
    })));
    
    setSelectedSeat(seat.id);
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-600 hover:bg-green-700 border-green-700';
      case 'booked':
        return 'bg-red-600 border-red-700 cursor-not-allowed';
      case 'selected':
        return 'bg-blue-600 border-blue-700 ring-2 ring-blue-400';
      default:
        return 'bg-gray-400';
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedSeat) {
      toast.error('Please select a seat first');
      return;
    }

    const seat = seats.find(s => s.id === selectedSeat);
    toast.success(`Seat ${seat?.number} booked successfully!`);
    
    setTimeout(() => {
      navigate('/student-dashboard');
    }, 1500);
  };

  const availableCount = seats.filter(s => s.status === 'available').length;
  const bookedCount = seats.filter(s => s.status === 'booked').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
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
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={lnmiitLogo} alt="LNMIIT Logo" className="h-16 w-auto" />
                  <div>
                    <CardTitle className="text-2xl">LNMIIT Bus Booking</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Bus CB-{busId?.padStart(3, '0')} - The LNM Institute of Information Technology
                    </CardDescription>
                  </div>
                </div>
                <Badge className="text-lg px-4 py-2">
                  {availableCount} seats available
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Seat Map */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bus Layout</CardTitle>
                <CardDescription>Click on an available seat to select</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Driver Section */}
                <div className="mb-6 flex justify-end">
                  <div className="bg-secondary border-2 border-border rounded-lg px-6 py-3">
                    <p className="text-sm font-semibold text-center">🚗 Driver</p>
                  </div>
                </div>

                {/* Seats Grid */}
                <div className="space-y-3">
                  {Array.from({ length: 10 }, (_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                      {/* Left side seats */}
                      <div className="flex gap-2">
                        {seats
                          .filter(seat => seat.row === rowIndex + 1)
                          .slice(0, 2)
                          .map(seat => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === 'booked'}
                              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center font-semibold text-white text-sm ${getSeatColor(seat.status)}`}
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>

                      {/* Aisle */}
                      <div className="w-8" />

                      {/* Right side seats */}
                      <div className="flex gap-2">
                        {seats
                          .filter(seat => seat.row === rowIndex + 1)
                          .slice(2, 4)
                          .map(seat => (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat)}
                              disabled={seat.status === 'booked'}
                              className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center font-semibold text-white text-sm ${getSeatColor(seat.status)}`}
                            >
                              {seat.number}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-8 pt-6 border-t flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 border-2 border-green-700 rounded-lg" />
                    <span className="text-sm font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600 border-2 border-red-700 rounded-lg" />
                    <span className="text-sm font-medium">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 border-2 border-blue-700 rounded-lg ring-2 ring-blue-400" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Seats</span>
                    <span className="font-semibold">40</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-semibold text-green-600">{availableCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Booked</span>
                    <span className="font-semibold text-red-600">{bookedCount}</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Selected Seat</p>
                  {selectedSeat ? (
                    <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-3">
                      <span className="font-bold text-lg">
                        Seat {seats.find(s => s.id === selectedSeat)?.number}
                      </span>
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                      <span className="text-sm text-muted-foreground">No seat selected</span>
                      <X className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-12 text-base font-semibold"
                  onClick={handleConfirmBooking}
                  disabled={!selectedSeat}
                >
                  Confirm Booking
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  You can cancel your booking up to 2 hours before departure
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSeat;
