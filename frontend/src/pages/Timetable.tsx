import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bus, Clock, MapPin, User } from 'lucide-react';
import lnmiitLogo from '@/assets/lnmiit-logo.png';

interface BusSchedule {
  id: string;
  busNumber: string;
  route: string;
  departureTime: string;
  arrivalTime?: string;
  from: string;
  to: string;
  days: string[];
  status: 'active' | 'delayed' | 'cancelled';
}

const schedules: BusSchedule[] = [
  // Morning Routes (6:00 AM - 8:30 AM) - Weekdays
  {
    id: '1',
    busNumber: 'Bus 1',
    route: 'LNMIIT → Raja Park',
    departureTime: '06:00 AM',
    arrivalTime: '06:30 AM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '2',
    busNumber: 'Bus 1',
    route: 'Raja Park → LNMIIT',
    departureTime: '07:00 AM',
    arrivalTime: '07:30 AM',
    from: 'Raja Park',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '3',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '07:00 AM',
    arrivalTime: '07:30 AM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '4',
    busNumber: 'Bus 3',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '07:00 AM',
    arrivalTime: '07:30 AM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Mon'],
    status: 'active'
  },
  {
    id: '5',
    busNumber: 'Bus 1',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '07:00 AM',
    arrivalTime: '07:30 AM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '6',
    busNumber: 'Bus 2',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '08:00 AM',
    arrivalTime: '08:30 AM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '7',
    busNumber: 'Bus 3',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '08:00 AM',
    arrivalTime: '08:30 AM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Mon'],
    status: 'active'
  },
  {
    id: '8',
    busNumber: 'Bus 1',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '08:00 AM',
    arrivalTime: '08:30 AM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  // Mid-Morning Routes (10:00 AM - 12:00 PM)
  {
    id: '9',
    busNumber: 'Bus 4',
    route: 'LNMIIT → Raja Park',
    departureTime: '10:00 AM',
    arrivalTime: '10:30 AM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '10',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Raja Park',
    departureTime: '10:00 AM',
    arrivalTime: '10:30 AM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '11',
    busNumber: 'Bus 4',
    route: 'Raja Park → LNMIIT',
    departureTime: '11:00 AM',
    arrivalTime: '11:30 AM',
    from: 'Raja Park',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '12',
    busNumber: 'Bus 2',
    route: 'Raja Park → LNMIIT',
    departureTime: '12:00 PM',
    arrivalTime: '12:30 PM',
    from: 'Raja Park',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  // Afternoon Routes (1:00 PM - 3:00 PM)
  {
    id: '13',
    busNumber: 'Bus 3',
    route: 'LNMIIT → Raja Park',
    departureTime: '01:00 PM',
    arrivalTime: '01:30 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '14',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Raja Park',
    departureTime: '02:00 PM',
    arrivalTime: '02:30 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '15',
    busNumber: 'Bus 3',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '03:00 PM',
    arrivalTime: '03:30 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  // Evening Routes (4:00 PM - 6:30 PM)
  {
    id: '16',
    busNumber: 'Bus 2',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '04:00 PM',
    arrivalTime: '04:30 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '17',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Raja Park',
    departureTime: '04:00 PM',
    arrivalTime: '04:30 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '18',
    busNumber: 'Bus 3',
    route: 'LNMIIT → Raja Park',
    departureTime: '04:30 PM',
    arrivalTime: '05:00 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '19',
    busNumber: 'Bus 3',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '04:30 PM',
    arrivalTime: '05:00 PM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '20',
    busNumber: 'Bus 1',
    route: 'LNMIIT → Raja Park',
    departureTime: '05:00 PM',
    arrivalTime: '05:30 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '21',
    busNumber: 'Bus 2',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '05:15 PM',
    arrivalTime: '05:45 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '22',
    busNumber: 'Bus 3',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '05:30 PM',
    arrivalTime: '06:00 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Fri'],
    status: 'active'
  },
  {
    id: '23',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Raja Park',
    departureTime: '06:00 PM',
    arrivalTime: '06:30 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '24',
    busNumber: 'Bus 1',
    route: 'LNMIIT → Raja Park',
    departureTime: '06:05 PM',
    arrivalTime: '06:35 PM',
    from: 'LNMIIT',
    to: 'Raja Park',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '25',
    busNumber: 'Bus 2',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '06:05 PM',
    arrivalTime: '06:35 PM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  // Night Routes (7:30 PM - 9:00 PM)
  {
    id: '26',
    busNumber: 'Bus 3',
    route: 'LNMIIT → Ajmeri Gate',
    departureTime: '07:30 PM',
    arrivalTime: '08:00 PM',
    from: 'LNMIIT',
    to: 'Ajmeri Gate',
    days: ['Fri'],
    status: 'active'
  },
  {
    id: '27',
    busNumber: 'Bus 2',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '08:15 PM',
    arrivalTime: '08:45 PM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '28',
    busNumber: 'Bus 3',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '08:15 PM',
    arrivalTime: '08:45 PM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '29',
    busNumber: 'Bus 1',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '09:00 PM',
    arrivalTime: '09:30 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  },
  {
    id: '30',
    busNumber: 'Bus 1',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '09:00 PM',
    arrivalTime: '09:30 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '31',
    busNumber: 'Bus 2',
    route: 'Transport Nagar → LNMIIT',
    departureTime: '09:00 PM',
    arrivalTime: '09:30 PM',
    from: 'Transport Nagar',
    to: 'LNMIIT',
    days: ['Sat', 'Sun'],
    status: 'active'
  },
  {
    id: '32',
    busNumber: 'Bus 3',
    route: 'Ajmeri Gate → LNMIIT',
    departureTime: '09:00 PM',
    arrivalTime: '09:30 PM',
    from: 'Ajmeri Gate',
    to: 'LNMIIT',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'active'
  }
];

const Timetable = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600 hover:bg-green-700">On Time</Badge>;
      case 'delayed':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Delayed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
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
                    <CardTitle className="text-3xl mb-2">LNMIIT Bus Timetable</CardTitle>
                    <p className="text-muted-foreground">
                      The LNM Institute of Information Technology - Effective from September 10, 2025
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Updated: Today, 6:00 AM</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Time Slots */}
        <div className="space-y-8">
          {/* Morning Slots */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold">Morning Routes (6:00 AM - 8:30 AM)</h2>
            </div>
            
            <div className="grid gap-4">
              {schedules
                .filter(s => {
                  const hour = parseInt(s.departureTime.split(':')[0]);
                  const period = s.departureTime.includes('PM') ? 'PM' : 'AM';
                  return period === 'AM' && hour >= 6 && hour < 9;
                })
                .map((schedule) => (
                  <Card key={schedule.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-5 gap-4">
                        {/* Bus Info */}
                        <div className="md:col-span-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-5 w-5 text-primary" />
                            <p className="font-bold text-lg">{schedule.busNumber}</p>
                          </div>
                          {getStatusBadge(schedule.status)}
                        </div>

                        {/* Route */}
                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Route</p>
                          <p className="font-semibold text-base">{schedule.route}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <p className="text-sm">{schedule.from}</p>
                          </div>
                        </div>

                        {/* Timing */}
                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-1">Departure</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <p className="font-bold text-primary">{schedule.departureTime}</p>
                          </div>
                          {schedule.arrivalTime && (
                            <>
                              <p className="text-sm text-muted-foreground mt-2">Arrival</p>
                              <p className="font-semibold">{schedule.arrivalTime}</p>
                            </>
                          )}
                        </div>

                        {/* Days */}
                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-2">Operating Days</p>
                          <div className="flex flex-wrap gap-1">
                            {schedule.days.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Mid-Morning to Afternoon Slots */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full" />
              <h2 className="text-2xl font-bold">Mid-Morning to Afternoon (10:00 AM - 3:00 PM)</h2>
            </div>
            
            <div className="grid gap-4">
              {schedules
                .filter(s => {
                  const timeParts = s.departureTime.split(':');
                  const hour = parseInt(timeParts[0]);
                  const period = s.departureTime.includes('PM') ? 'PM' : 'AM';
                  return (period === 'AM' && hour >= 10) || (period === 'PM' && hour >= 1 && hour <= 3);
                })
                .map((schedule) => (
                  <Card key={schedule.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-5 gap-4">
                        <div className="md:col-span-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-5 w-5 text-accent" />
                            <p className="font-bold text-lg">{schedule.busNumber}</p>
                          </div>
                          {getStatusBadge(schedule.status)}
                        </div>

                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Route</p>
                          <p className="font-semibold text-base">{schedule.route}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <p className="text-sm">{schedule.from}</p>
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-1">Departure</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <p className="font-bold text-accent">{schedule.departureTime}</p>
                          </div>
                          {schedule.arrivalTime && (
                            <>
                              <p className="text-sm text-muted-foreground mt-2">Arrival</p>
                              <p className="font-semibold">{schedule.arrivalTime}</p>
                            </>
                          )}
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-2">Operating Days</p>
                          <div className="flex flex-wrap gap-1">
                            {schedule.days.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>

          {/* Evening Routes */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
              <h2 className="text-2xl font-bold">Evening Routes (4:00 PM - 6:30 PM)</h2>
            </div>
            
            <div className="grid gap-4">
              {schedules
                .filter(s => {
                  const timeParts = s.departureTime.split(':');
                  const hour = parseInt(timeParts[0]);
                  const period = s.departureTime.includes('PM') ? 'PM' : 'AM';
                  return period === 'PM' && hour >= 4 && hour < 7;
                })
                .map((schedule) => (
                  <Card key={schedule.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-5 gap-4">
                        <div className="md:col-span-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-5 w-5 text-primary" />
                            <p className="font-bold text-lg">{schedule.busNumber}</p>
                          </div>
                          {getStatusBadge(schedule.status)}
                        </div>

                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Route</p>
                          <p className="font-semibold text-base">{schedule.route}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <p className="text-sm">{schedule.from}</p>
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-1">Departure</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <p className="font-bold text-primary">{schedule.departureTime}</p>
                          </div>
                          {schedule.arrivalTime && (
                            <>
                              <p className="text-sm text-muted-foreground mt-2">Arrival</p>
                              <p className="font-semibold">{schedule.arrivalTime}</p>
                            </>
                          )}
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-2">Operating Days</p>
                          <div className="flex flex-wrap gap-1">
                            {schedule.days.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Night Routes */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full" />
              <h2 className="text-2xl font-bold">Night Routes (7:30 PM - 9:30 PM)</h2>
            </div>
            
            <div className="grid gap-4">
              {schedules
                .filter(s => {
                  const timeParts = s.departureTime.split(':');
                  const hour = parseInt(timeParts[0]);
                  const period = s.departureTime.includes('PM') ? 'PM' : 'AM';
                  return period === 'PM' && hour >= 7;
                })
                .map((schedule) => (
                  <Card key={schedule.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-1 bg-gradient-to-r from-accent to-primary" />
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-5 gap-4">
                        <div className="md:col-span-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bus className="h-5 w-5 text-accent" />
                            <p className="font-bold text-lg">{schedule.busNumber}</p>
                          </div>
                          {getStatusBadge(schedule.status)}
                        </div>

                        <div className="md:col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Route</p>
                          <p className="font-semibold text-base">{schedule.route}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <p className="text-sm">{schedule.from}</p>
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-1">Departure</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <p className="font-bold text-accent">{schedule.departureTime}</p>
                          </div>
                          {schedule.arrivalTime && (
                            <>
                              <p className="text-sm text-muted-foreground mt-2">Arrival</p>
                              <p className="font-semibold">{schedule.arrivalTime}</p>
                            </>
                          )}
                        </div>

                        <div className="md:col-span-1">
                          <p className="text-sm text-muted-foreground mb-2">Operating Days</p>
                          <div className="flex flex-wrap gap-1">
                            {schedule.days.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Status Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 hover:bg-green-700">On Time</Badge>
                <span className="text-sm text-muted-foreground">Bus is running on schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500 hover:bg-amber-600">Delayed</Badge>
                <span className="text-sm text-muted-foreground">Bus is running late</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Cancelled</Badge>
                <span className="text-sm text-muted-foreground">Service cancelled for today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timetable;
