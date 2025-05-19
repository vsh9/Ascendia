
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PageTitle } from "@/components/ui/typography";
import { User, MapPin, GraduationCap, Briefcase, Phone, Mail, Edit } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSetupProfile, setHasSetupProfile] = useState(false);

  useEffect(() => {
    // Check if user is logged in and has set up profile
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const profileSetup = localStorage.getItem("hasSetupProfile") === "true";
    
    setIsLoggedIn(loggedIn);
    setHasSetupProfile(profileSetup);
    
    if (!loggedIn) {
      navigate("/login");
      return;
    }
    
    if (loggedIn && !profileSetup) {
      navigate("/profile/setup");
      return;
    }
    
    // Load profile data
    const storedProfile = localStorage.getItem("userProfile");
    const storedImage = localStorage.getItem("profileImage");
    
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (!isLoggedIn || !hasSetupProfile || !profile) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/80 to-background">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <PageTitle>My Profile</PageTitle>
            <div className="space-x-3 mt-4 md:mt-0">
              <Button variant="outline" onClick={() => navigate("/profile/setup")} className="hover:shadow-md transition-all">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="destructive" onClick={handleLogout} className="hover:shadow-md transition-all">
                Logout
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Profile Sidebar */}
            <Card className="lg:col-span-1 border-2 border-primary/10 bg-card shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4 ring-4 ring-primary/20 shadow-lg">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt="Profile" />
                    ) : (
                      <AvatarFallback className="bg-primary/5">
                        <User className="h-16 w-16 text-primary" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{profile.fullName}</h2>
                  <p className="text-muted-foreground mb-4">{profile.jobTitle}</p>
                  
                  <div className="w-full space-y-4 mt-4">
                    {profile.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">{profile.email}</span>
                      </div>
                    )}
                    
                    {profile.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                    
                    {profile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* About Section */}
              <Card className="border-2 border-primary/10 bg-card shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </span>
                    About Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{profile.bio || "No bio information provided."}</p>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="border-2 border-primary/10 bg-card shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </span>
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.university ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{profile.university}</h3>
                          <div className="text-sm text-muted-foreground">
                            {profile.degree && (
                              <Badge variant="secondary" className="mr-2">
                                {profile.degree.charAt(0).toUpperCase() + profile.degree.slice(1)}
                              </Badge>
                            )}
                            {profile.course && (
                              <Badge variant="outline" className="mr-2">
                                {profile.course}
                              </Badge>
                            )}
                            {profile.graduationYear && (
                              <span className="inline-block mt-2">Class of {profile.graduationYear}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No education information provided.</p>
                  )}
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card className="border-2 border-primary/10 bg-card shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </span>
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.currentCompany ? (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{profile.jobTitle}</h3>
                          <div className="text-sm text-muted-foreground">
                            <span>{profile.currentCompany}</span>
                          </div>
                          <p className="mt-2">{profile.workExperience}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No work experience information provided.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
