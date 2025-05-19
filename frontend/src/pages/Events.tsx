
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTitle, LeadText } from "@/components/ui/typography";
import { Calendar, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Sample event data with registrationLinks
export const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "June 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, Bangalore",
    description: "Join us for the biggest tech conference of the year featuring industry leaders, workshops, and networking opportunities.",
    imageUrl: "linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
    registrationLink: "https://forms.gle/TAF4W3H3T7sR6Khv7", // Admin-defined link
  },
  {
    id: 2,
    title: "AI Summit",
    date: "July 5-7, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Tech Hub, Mumbai",
    description: "Explore the latest in artificial intelligence with hands-on workshops and expert presentations.",
    imageUrl: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
    registrationLink: "https://forms.gle/ZLCNRfepeZXAyxYh6", // Admin-defined link
  },
];

export default function Events() {
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
      </main>

      <Footer />
    </div>
  );
}
