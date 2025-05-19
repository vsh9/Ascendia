
import { Button } from "@/components/ui/button";
import { PageTitle, LeadText } from "@/components/ui/typography";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative isolate overflow-hidden">
          <div className="hero-gradient absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>
          
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-40 lg:px-8 lg:pt-44">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <PageTitle className="text-gradient">
                  Connect. Learn. Grow.
                </PageTitle>
                <LeadText className="mt-6">
                  Join the most powerful alumni network platform. Connect with mentors,
                  find opportunities, and grow your career with guidance from
                  experienced professionals.
                </LeadText>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link to="/login">
                    <Button size="lg" className="rounded-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-br from-primary to-secondary opacity-[0.05] blur-3xl" />
                    <img
                      src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt="App screenshot"
                      className="relative aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-br from-primary to-secondary opacity-[0.05] blur-3xl" />
                    <img
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt="App screenshot"
                      className="relative aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-br from-primary to-secondary opacity-[0.05] blur-3xl" />
                    <img
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt="App screenshot"
                      className="relative aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
