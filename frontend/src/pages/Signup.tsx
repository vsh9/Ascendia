
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSquare2, GraduationCap, ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/ui/typography";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useNavigate } from "react-router-dom";

type UserType = "alumni" | "student" | null;

export default function Signup() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
      confirmPassword: formData.password === formData.confirmPassword ? "" : "Passwords do not match",
    };
    
    setErrors(newErrors);
    
    // If no errors, proceed with signup
    if (!Object.values(newErrors).some(error => error)) {
      console.log("Signup attempted:", { type: selectedType, ...formData });
      // Here you would typically make an API call to register the user
      
      // For now, just navigate to login
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-16">
        <div className="container max-w-md px-4">
          <PageTitle className="text-center mb-8">Create Your Account</PageTitle>
          
          {!selectedType ? (
            <Card className="backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Choose Account Type</CardTitle>
                <CardDescription>Select how you want to register</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-16 text-lg justify-start space-x-4"
                  onClick={() => setSelectedType("alumni")}
                >
                  <UserSquare2 className="h-6 w-6" />
                  <span>Register as Alumni</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-16 text-lg justify-start space-x-4"
                  onClick={() => setSelectedType("student")}
                >
                  <GraduationCap className="h-6 w-6" />
                  <span>Register as Student</span>
                </Button>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {selectedType === "alumni" ? (
                    <>
                      <UserSquare2 className="h-5 w-5" />
                      <span>Alumni Registration</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-5 w-5" />
                      <span>Student Registration</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      required
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Create a password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm Password</label>
                    <Input
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSelectedType(null)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="px-8">
                      Register
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
