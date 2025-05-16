
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTitle, LeadText } from "@/components/ui/typography";
import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";

// Sample event data with registrationLinks
export const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "April 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, Bangalore",
    description: "Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities.",
    imageUrl: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
    speakers: ["Sarah Chen", "Alex Johnson", "Michael Rodriguez"],
    registrationLink: "https://techconf2024.example.com/register", // Admin-defined link
  },
  {
    id: 2,
    title: "AI Summit",
    date: "May 5-6, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "Tech Hub, Mumbai",
    description: "Explore the latest in artificial intelligence with hands-on workshops and expert presentations.",
    imageUrl: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
    speakers: ["Dr. Emma Thompson", "Prof. Raj Kumar", "Dr. Lisa Wang"],
    registrationLink: "https://aisummit.example.com/register", // Admin-defined link
  },
];

export default function Events() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your event assistant. How can I help you today?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { text: userInput, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        text: "I'll be happy to help you with information about our events. Please let me know what specific details you're looking for!", 
        isUser: false 
      }]);
    }, 1000);

    setUserInput("");
  };

  const handleRegister = (registrationLink: string) => {
    // Open the registration link in a new tab
    window.open(registrationLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <PageTitle>
                Upcoming Events
              </PageTitle>
              <LeadText className="mt-6">
                Join us for exciting tech events and conferences
              </LeadText>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {events.map((event) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden transform transition-all hover:shadow-xl"
                >
                  <div 
                    className="h-48 w-full" 
                    style={{ 
                      background: event.imageUrl,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        onClick={() => handleRegister(event.registrationLink)}
                      >
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot */}
        <div className="fixed bottom-4 left-4 z-50">
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
                <CardTitle className="text-lg">Event Assistant</CardTitle>
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
                    placeholder="Ask about events..."
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
