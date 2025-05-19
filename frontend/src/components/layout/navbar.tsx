
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, Users, MessageSquare, Briefcase, Calendar, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navigation = [{
  name: "Mentorship",
  href: "/mentorship",
  icon: Users
}, {
  name: "Community Forum",
  href: "/forum",
  icon: MessageSquare
}, {
  name: "Job Board",
  href: "/jobs",
  icon: Briefcase
}, {
  name: "Events",
  href: "/events",
  icon: Calendar
}];

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm border-b">
      <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 text-xl font-semibold">Ascendia</Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map(item => <SheetClose asChild key={item.name}>
                        <Link to={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent">
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </div>
                        </Link>
                      </SheetClose>)}
                  </div>
                  <div className="py-6">
                    <SheetClose asChild>
                      {isLoggedIn ? (
                        <Link to="/profile">
                          <Button className="w-full" size="lg">
                            My Profile
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/login">
                          <Button className="w-full" size="lg">
                            Log in
                          </Button>
                        </Link>
                      )}
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map(item => <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80 transition-colors flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>)}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <Link to="/profile">
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="lg">Log in</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>;
}
