import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Calendar as CalendarIcon, Filter } from "lucide-react";
import { PageTitle, LeadText } from "@/components/ui/typography";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ChatWindow from "@/components/chat/ChatWindow";

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    image: "photo-1581091226825-a6a2a5aee158",
    role: "AI Research Scientist",
    company: "Tech Innovations Inc.",
    expertise: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
    bio: "Leading AI researcher with 10+ years of experience in developing neural networks and machine learning solutions.",
    availability: "Mon-Thu, 2-6 PM",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    image: "photo-1581092795360-fd1ca04f0952",
    role: "Senior Data Scientist",
    company: "DataCorp Analytics",
    expertise: ["Data Science", "Big Data", "Analytics"],
    bio: "Passionate about turning data into actionable insights. Experienced in building scalable data solutions.",
    availability: "Tue-Fri, 10 AM-2 PM",
  },
  {
    id: 3,
    name: "Emma Thompson",
    image: "photo-1485827404703-89b55fcc595e",
    role: "Finance Director",
    company: "Global Investments Ltd",
    expertise: ["Finance", "Investment Banking", "Market Analysis"],
    bio: "15+ years of experience in investment banking and financial markets. Dedicated to helping students break into finance.",
    availability: "Wed-Fri, 3-7 PM",
  },
];

const domains = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Finance",
  "Investment Banking",
  "Big Data",
  "Analytics",
];

export default function MentorshipPage() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentorForChat, setSelectedMentorForChat] = useState<typeof mentors[0] | null>(null);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomains.length === 0 ||
      mentor.expertise.some(exp => selectedDomains.includes(exp));
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <PageTitle>
                Find Your Perfect Mentor
              </PageTitle>
              <LeadText className="mt-6">
                Connect with industry experts who can guide you through your career journey and help you achieve your goals.
              </LeadText>
            </div>
          </div>
        </section>

        <section className="py-8 border-b">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mentors by name or expertise..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <Button
                    key={domain}
                    variant={selectedDomains.includes(domain) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedDomains(prev =>
                        prev.includes(domain)
                          ? prev.filter(d => d !== domain)
                          : [...prev, domain]
                      );
                    }}
                  >
                    {domain}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/${mentor.image}`} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{mentor.name}</CardTitle>
                        <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((exp) => (
                        <Badge key={exp} variant="secondary">{exp}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Available: {mentor.availability}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={() => setSelectedMentorForChat(mentor)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={!!selectedMentorForChat} onOpenChange={() => setSelectedMentorForChat(null)}>
        <DialogContent className="sm:max-w-[600px] p-0">
          {selectedMentorForChat && (
            <ChatWindow
              mentor={selectedMentorForChat}
              onClose={() => setSelectedMentorForChat(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
