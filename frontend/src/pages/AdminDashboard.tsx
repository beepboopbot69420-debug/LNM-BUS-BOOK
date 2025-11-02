import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bus, 
  Users, 
  Clock, 
  TrendingUp, 
  Plus,
  Download,
  LogOut,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import lnmiitLogo from '@/assets/lnmiit-logo.png';

interface BusData {
  id: string;
  busNumber: string;
  route: string;
  driver: string;
  totalSeats: number;
  bookedSeats: number;
  departureTime: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<BusData[]>([
    {
      id: '1',
      busNumber: 'CB-101',
      route: 'North Campus - Main Campus',
      driver: 'Rajesh Kumar',
      totalSeats: 40,
      bookedSeats: 28,
      departureTime: '08:00 AM'
    },
    {
      id: '2',
      busNumber: 'CB-102',
      route: 'South Campus - Main Campus',
      driver: 'Amit Sharma',
      totalSeats: 40,
      bookedSeats: 35,
      departureTime: '08:30 AM'
    },
    {
      id: '3',
      busNumber: 'CB-103',
      route: 'East Campus - Main Campus',
      driver: 'Suresh Patel',
      totalSeats: 40,
      bookedSeats: 22,
      departureTime: '07:45 AM'
    }
  ]);

  const [newBus, setNewBus] = useState({
    busNumber: '',
    route: '',
    driver: '',
    totalSeats: 40,
    departureTime: ''
  });

  const handleAddBus = () => {
    if (!newBus.busNumber || !newBus.route || !newBus.driver || !newBus.departureTime) {
      toast.error('Please fill all fields');
      return;
    }

    const bus: BusData = {
      id: String(buses.length + 1),
      ...newBus,
      bookedSeats: 0
    };

    setBuses([...buses, bus]);
    setNewBus({
      busNumber: '',
      route: '',
      driver: '',
      totalSeats: 40,
      departureTime: ''
    });
    toast.success('Bus added successfully!');
  };

  const handleDeleteBus = (id: string) => {
    setBuses(buses.filter(bus => bus.id !== id));
    toast.success('Bus removed successfully!');
  };

  const handleDownloadReport = () => {
    toast.success('Report downloaded successfully!');
  };

  const totalBookings = buses.reduce((acc, bus) => acc + bus.bookedSeats, 0);
  const totalCapacity = buses.reduce((acc, bus) => acc + bus.totalSeats, 0);
  const occupancyRate = ((totalBookings / totalCapacity) * 100).toFixed(1);

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
                <p className="text-sm text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Buses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-primary">{buses.length}</p>
                <Bus className="h-8 w-8 text-primary/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-accent">{totalBookings}</p>
                <Users className="h-8 w-8 text-accent/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-600/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Occupancy Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-green-600">{occupancyRate}%</p>
                <TrendingUp className="h-8 w-8 text-green-600/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Waiting List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-amber-500">12</p>
                <Clock className="h-8 w-8 text-amber-500/40" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="buses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="buses">Manage Buses</TabsTrigger>
            <TabsTrigger value="add">Add Bus</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Manage Buses Tab */}
          <TabsContent value="buses" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Active Buses</h2>
            </div>

            <div className="grid gap-4">
              {buses.map((bus) => (
                <Card key={bus.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{bus.busNumber}</CardTitle>
                          <Badge variant={bus.bookedSeats >= bus.totalSeats ? 'destructive' : 'default'}>
                            {bus.bookedSeats}/{bus.totalSeats} Seats
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{bus.route}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteBus(bus.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Driver</p>
                        <p className="font-semibold">{bus.driver}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Departure</p>
                        <p className="font-semibold">{bus.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Occupancy</p>
                        <p className="font-semibold">
                          {((bus.bookedSeats / bus.totalSeats) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                        style={{ width: `${(bus.bookedSeats / bus.totalSeats) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Bus Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Bus</CardTitle>
                <CardDescription>Enter the details of the new bus to add to the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="busNumber">Bus Number</Label>
                    <Input 
                      id="busNumber" 
                      placeholder="CB-105"
                      value={newBus.busNumber}
                      onChange={(e) => setNewBus({...newBus, busNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Route</Label>
                    <Input 
                      id="route" 
                      placeholder="West Campus - Main Campus"
                      value={newBus.route}
                      onChange={(e) => setNewBus({...newBus, route: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver">Driver Name</Label>
                    <Input 
                      id="driver" 
                      placeholder="John Doe"
                      value={newBus.driver}
                      onChange={(e) => setNewBus({...newBus, driver: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureTime">Departure Time</Label>
                    <Input 
                      id="departureTime" 
                      placeholder="09:00 AM"
                      value={newBus.departureTime}
                      onChange={(e) => setNewBus({...newBus, departureTime: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSeats">Total Seats</Label>
                    <Input 
                      id="totalSeats" 
                      type="number"
                      value={newBus.totalSeats}
                      onChange={(e) => setNewBus({...newBus, totalSeats: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={handleAddBus}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bus
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
                <CardDescription>Generate and download booking reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-between h-auto py-4"
                    onClick={handleDownloadReport}
                  >
                    <div className="text-left">
                      <p className="font-semibold">Daily Booking Report</p>
                      <p className="text-sm text-muted-foreground">Today's bookings and occupancy</p>
                    </div>
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-between h-auto py-4"
                    onClick={handleDownloadReport}
                  >
                    <div className="text-left">
                      <p className="font-semibold">Weekly Summary</p>
                      <p className="text-sm text-muted-foreground">Last 7 days statistics</p>
                    </div>
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-between h-auto py-4"
                    onClick={handleDownloadReport}
                  >
                    <div className="text-left">
                      <p className="font-semibold">Monthly Report</p>
                      <p className="text-sm text-muted-foreground">Complete month analysis</p>
                    </div>
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
