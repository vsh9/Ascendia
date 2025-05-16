
import { SectionTitle, LeadText } from "@/components/ui/typography";
import { Users, MessageSquare, Briefcase, Calendar } from "lucide-react";

const features = [
  {
    name: "Mentorship",
    description:
      "Connect with experienced alumni who can guide you through your career journey with personalized mentorship.",
    icon: Users,
  },
  {
    name: "Community Forum",
    description:
      "Engage in meaningful discussions, share experiences, and get advice from a thriving community of professionals.",
    icon: MessageSquare,
  },
  {
    name: "Job Board",
    description:
      "Access exclusive job opportunities posted by alumni and find your next career move with confidence.",
    icon: Briefcase,
  },
  {
    name: "Events",
    description:
      "Participate in webinars, workshops, and networking events to expand your professional network.",
    icon: Calendar,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle>Everything you need to succeed</SectionTitle>
          <LeadText className="mt-6">
            Our platform provides all the tools and connections you need to advance
            your career and grow professionally.
          </LeadText>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-lg font-semibold leading-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
