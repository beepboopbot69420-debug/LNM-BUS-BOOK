import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bus, Mail, Lock, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import lnmiitLogo from '@/assets/lnmiit-logo.png';

const Index = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simple mock validation
    if (loginEmail === 'admin@lnmiit.ac.in') {
      toast.success('Admin login successful!');
      navigate('/admin-dashboard');
    } else if (loginEmail.includes('@lnmiit.ac.in')) {
        toast.success('Login successful!');
        navigate('/student-dashboard');
      }
    else {
      toast.error('Invalid college email');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!signupEmail.includes('@lnmiit.ac.in')) {
      toast.error('Please use your college email address');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    toast.success('Account created successfully! Please login.');
    setIsLogin(true);
    setLoginEmail(signupEmail);
  };

  const handleAdminLogin = () => {
    toast.success('Redirecting to admin login...');
    setLoginEmail('admin@lnmiit.ac.in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <img src={lnmiitLogo} alt="LNMIIT Logo" className="h-32 w-auto" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            LNMIIT Bus Booking System
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            The LNM Institute of Information Technology - Book your campus shuttle seats seamlessly
          </p>
        </div>

        {/* Auth Cards */}
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome to LNMIIT</CardTitle>
              <CardDescription className="text-center">
                Login to book your LNMIIT bus seat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">LNMIIT Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="student@lnmiit.ac.in"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-11 text-base font-semibold"
                    >
                      Sign In
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      variant="outline" 
                      className="w-full"
                      onClick={handleAdminLogin}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Login
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Aditi Vashisth"
                          className="pl-10"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">LNMIIT Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="student@lnmiit.ac.in"
                          className="pl-10"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be a valid LNMIIT email address
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create password (min 6 characters)"
                          className="pl-10"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="Re-enter password"
                          className="pl-10"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-11 text-base font-semibold"
                    >
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                📍Rupa ki Nangal, Post-Sumel, Via - Jamdoli, Jaipur, Rajasthan 302031
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
