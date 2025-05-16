import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, MapPin, GraduationCap, Briefcase, Phone, Calendar } from "lucide-react";
import { PageTitle } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ProfileSetup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    university: "",
    degree: "",
    course: "",
    graduationYear: "",
    currentCompany: "",
    jobTitle: "",
    workExperience: "",
  });

  // Course options based on degree
  const [courseOptions, setCourseOptions] = useState<string[]>([]);

  useEffect(() => {
    // Update course options when degree changes
    if (formData.degree === "bachelor") {
      setCourseOptions([
        "B.Tech in Computer Science and Engineering",
        "B.Tech in Information Technology",
        "B.Tech in Electronics and Communication",
        "B.Tech in Electrical Engineering",
        "B.Tech in Mechanical Engineering",
        "BCA (Bachelor of Computer Applications)",
        "B.Sc in Computer Science",
        "B.Com",
        "BBA (Bachelor of Business Administration)",
        "Other"
      ]);
    } else if (formData.degree === "master") {
      setCourseOptions([
        "M.Tech in Computer Science",
        "M.Tech in Information Technology",
        "M.Tech in Electronics",
        "MCA (Master of Computer Applications)",
        "M.Sc in Computer Science",
        "MBA (Master of Business Administration)",
        "Other"
      ]);
    } else if (formData.degree === "phd") {
      setCourseOptions([
        "Ph.D in Computer Science",
        "Ph.D in Information Technology",
        "Ph.D in Electronics",
        "Ph.D in Business Administration",
        "Other"
      ]);
    } else {
      setCourseOptions(["Select a degree first"]);
    }

    // Reset course when degree changes
    if (formData.degree && formData.course && !courseOptions.includes(formData.course)) {
      setFormData(prev => ({ ...prev, course: "" }));
    }
  }, [formData.degree]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would send data to your backend
    localStorage.setItem("userProfile", JSON.stringify(formData));
    localStorage.setItem("profileImage", profileImage || "");
    localStorage.setItem("hasSetupProfile", "true");

    toast({
      title: "Profile setup complete",
      description: "Your profile has been created successfully",
    });

    navigate("/profile");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <PageTitle className="text-center mb-8">
            Set Up Your Profile
          </PageTitle>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Basic Information"}
                {step === 2 && "Education Details"}
                {step === 3 && "Professional Experience"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about yourself"}
                {step === 2 && "Share your educational background"}
                {step === 3 && "Share your professional experience"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt="Profile" />
                        ) : (
                          <AvatarFallback>
                            <User className="h-12 w-12" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <label htmlFor="profile-image" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Upload Photo
                          </Button>
                          <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, State"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">University/College</label>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          placeholder="Enter your university or college name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Degree</label>
                        <Select
                          value={formData.degree}
                          onValueChange={(value) => handleSelectChange("degree", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your degree" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelor">Bachelor's</SelectItem>
                            <SelectItem value="master">Master's</SelectItem>
                            <SelectItem value="phd">Ph.D.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Course</label>
                        <Select
                          value={formData.course}
                          onValueChange={(value) => handleSelectChange("course", value)}
                          disabled={!formData.degree}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={formData.degree ? "Select your course" : "Select a degree first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Graduation Year</label>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleChange}
                          placeholder="Year of graduation"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Company</label>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Input
                          name="currentCompany"
                          value={formData.currentCompany}
                          onChange={handleChange}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title</label>
                      <Input
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Enter your job title"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Work Experience</label>
                      <Textarea
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        placeholder="Describe your work experience"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>
                  Complete Profile
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
