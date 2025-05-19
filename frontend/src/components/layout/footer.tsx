import { Link } from "react-router-dom";

const navigation = {
  platform: [
    { name: "Mentorship", href: "/mentorship" },
    { name: "Community Forum", href: "/forum" },
    { name: "Job Board", href: "/jobs" },
    { name: "Events", href: "/events" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Instagram", href: "https://instagram.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16 justify-items-center md:justify-items-start">
          <div>
            <h3 className="text-sm font-semibold leading-6">Platform</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-6">Social</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} AlumniConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}