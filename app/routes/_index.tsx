import { Link } from "@remix-run/react";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Target,
  Clock,
  Star,
} from "lucide-react";
import Header from "~/components/header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-100 px-4 py-20 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Forge Your Focus, Achieve Your Goals
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              FocusForge helps you laser-focus on what matters most, turning
              your aspirations into achievements with powerful goal-setting and
              tracking tools.
            </p>
            <Link
              to="#get-started"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-primary/90"
            >
              Start Forging Your Future
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold dark:text-black">
              Forge Your Success with Our Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Goal Setting",
                  description:
                    "Set clear, actionable goals with our intuitive interface.",
                },
                {
                  icon: BarChart,
                  title: "Progress Tracking",
                  description:
                    "Visualize your journey with detailed progress analytics.",
                },
                {
                  icon: Clock,
                  title: "Time Management",
                  description:
                    "Optimize your time with our smart scheduling tools.",
                },
                {
                  icon: CheckCircle,
                  title: "Task Prioritization",
                  description:
                    "Focus on what's important with AI-powered task sorting.",
                },
                {
                  icon: Star,
                  title: "Achievement Celebration",
                  description:
                    "Stay motivated with milestone celebrations and rewards.",
                },
                {
                  icon: ArrowRight,
                  title: "Continuous Improvement",
                  description:
                    "Learn and adapt with personalized improvement suggestions.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-black"
                >
                  <feature.icon className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="bg-gray-100 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto">
            <h2 className="d mb-12 text-center text-3xl font-bold">
              What Our Forgers Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "Entrepreneur",
                  quote:
                    "FocusForge turned my scattered ideas into a clear roadmap for success.",
                },
                {
                  name: "Sarah Lee",
                  role: "Project Manager",
                  quote:
                    "I've never been more productive. This tool is a game-changer for team goal-setting.",
                },
                {
                  name: "Michael Chen",
                  role: "Student",
                  quote:
                    "Balancing studies and personal projects became so much easier with FocusForge.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 shadow-sm dark:bg-black"
                >
                  <p className="mb-4 text-gray-600">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Choose Your Forging Path
            </h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$9",
                  features: [
                    "Goal setting",
                    "Basic progress tracking",
                    "Email support",
                  ],
                },
                {
                  name: "Pro",
                  price: "$19",
                  features: [
                    "Everything in Starter",
                    "Advanced analytics",
                    "Time management tools",
                    "Priority support",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Everything in Pro",
                    "Custom integrations",
                    "Dedicated account manager",
                    "Team collaboration tools",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg bg-gray-50 p-6 shadow-sm dark:bg-black ${index === 1 ? "border-2 border-primary" : ""}`}
                >
                  <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
                  <div className="mb-4 text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-600">
                      {plan.price !== "Custom" ? "/month" : ""}
                    </span>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="#get-started"
                    className={`block rounded-md px-4 py-2 text-center ${index === 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-800"} transition-opacity hover:opacity-90`}
                  >
                    Choose Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="get-started"
          className="bg-primary px-4 py-20 text-white dark:bg-black sm:px-6 lg:px-8"
        >
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold dark:text-black">
              Ready to Forge Your Success?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl">
              Join thousands of achievers who are turning their goals into
              reality with FocusForge.
            </p>
            <Link
              to="#"
              className="dark:bg- inline-flex items-center rounded-md bg-white px-6 py-3 text-lg font-medium text-primary transition-colors hover:bg-gray-100 dark:text-black"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="transition-colors hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          © {new Date().getFullYear()} FocusForge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
