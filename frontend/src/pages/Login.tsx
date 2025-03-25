
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserSquare2, GraduationCap, LogIn } from "lucide-react";
import { PageTitle } from "@/components/ui/typography";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type UserType = "alumni" | "student" | null;

export default function Login() {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted:", { type: selectedType, ...credentials });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-16">
        <div className="container max-w-md px-4">
          <PageTitle className="text-center mb-8">Welcome Back</PageTitle>
          
          {!selectedType ? (
            <Card className="backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Choose Login Type</CardTitle>
                <CardDescription>Select how you want to login</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-16 text-lg justify-start space-x-4"
                  onClick={() => setSelectedType("alumni")}
                >
                  <UserSquare2 className="h-6 w-6" />
                  <span>Login as Alumni</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-16 text-lg justify-start space-x-4"
                  onClick={() => setSelectedType("student")}
                >
                  <GraduationCap className="h-6 w-6" />
                  <span>Login as Student</span>
                </Button>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      New to AlumniConnect?
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => window.location.href = "/signup"}
                >
                  Create Account
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
                      <span>Alumni Login</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="h-5 w-5" />
                      <span>Student Login</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  Enter your credentials to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      required
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      required
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSelectedType(null)}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="px-8">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
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
