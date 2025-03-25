import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/typography";
import { Search, MapPin, DollarSign, Briefcase, Clock, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { indianStates, indianCities } from "@/data/indianLocations";

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    experience: "5+ years",
    description: "We're seeking an experienced software engineer to join our team and help build scalable web applications using modern technologies.",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Creative Design Co",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our design team to create beautiful and intuitive user interfaces for our enterprise clients.",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Remote",
    salary: "$100,000 - $140,000",
    type: "Contract",
    experience: "4+ years",
    description: "Help us build and maintain our cloud infrastructure and deployment pipelines using modern DevOps practices.",
  },
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    salary: [50000, 200000],
    type: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSalaryChange = (value) => {
    setFilters((prev) => ({ ...prev, salary: value }));
  };

  const availableCities = filters.state ? indianCities[filters.state] || [] : [];

  const applyFilters = () => {
    const filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filters.type || job.type === filters.type;
      const matchesSalary = job.salary && parseInt(job.salary.replace(/[^0-9]/g, '')) >= filters.salary[0] &&
                           parseInt(job.salary.replace(/[^0-9]/g, '')) <= filters.salary[1];
      
      return matchesSearch && matchesType && matchesSalary;
    });
    setFilteredJobs(filtered);
  };

  const handleApplyNow = (jobId) => {
    console.log(`Applying for job ${jobId}`);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="bg-muted/30 pt-20 pb-12">
          <div className="container mx-auto px-4">
            <PageTitle className="text-center mb-8">
              Find Your Next Opportunity
            </PageTitle>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-4">
              <Card className="h-fit lg:sticky lg:top-20">
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select
                      value={filters.state}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, state: value, city: "" }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Select
                      value={filters.city}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, city: value }))
                      }
                      disabled={!filters.state}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Salary Range</label>
                    <div className="pt-2">
                      <Slider
                        defaultValue={[50000, 200000]}
                        max={200000}
                        min={0}
                        step={5000}
                        value={filters.salary}
                        onValueChange={handleSalaryChange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>${filters.salary[0].toLocaleString()}</span>
                        <span>${filters.salary[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select
                      value={filters.type}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>

                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        state: "",
                        city: "",
                        salary: [50000, 200000],
                        type: "",
                      });
                      setFilteredJobs(jobs);
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <p className="text-lg text-muted-foreground mt-1">
                            {job.company}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button onClick={() => setSelectedJob(job)}>
                              View More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>{job.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg">{job.company}</h4>
                                <p className="text-muted-foreground">{job.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{job.experience}</span>
                                </div>
                              </div>
                              <Button 
                                className="w-full"
                                onClick={() => handleApplyNow(job.id)}
                              >
                                <Send className="mr-2 h-4 w-4" /> Apply Now
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{job.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
