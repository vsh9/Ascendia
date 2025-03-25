
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { PageTitle } from "@/components/ui/typography";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { events } from "./Events"; // Import the events array

export default function EventRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your registration assistant. How can I help you?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");

  // Find the event based on the ID
  const event = events.find(e => e.id === Number(id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the registration submission
    console.log("Registration submitted:", formData);
    navigate("/events");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { text: userInput, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "I'm here to help with your registration questions. What would you like to know about the event?", 
        isUser: false 
      }]);
    }, 1000);

    setUserInput("");
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <PageTitle className="text-center mb-12">
            Register for {event.title}
          </PageTitle>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
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
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Complete Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="fixed bottom-4 right-4 z-50">
          {!isChatOpen ? (
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          ) : (
            <Card className="w-80">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Registration Assistant</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                >
                  ×
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-2">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg max-w-[80%] ${
                        message.isUser
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about registration..."
                    className="flex-1 px-3 py-2 rounded-md border"
                  />
                  <Button type="submit" size="sm">Send</Button>
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
