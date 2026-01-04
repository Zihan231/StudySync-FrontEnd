// src/pages/HowItWorks.jsx
import React from "react";
import { NavLink } from "react-router"; // per your preference
import { FaUserGraduate, FaSearch, FaCalendarAlt, FaComments, FaStar, FaLock, FaBolt } from "react-icons/fa";


const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Create your profile",
      desc: "Tell us your subjects, level (Beginner/Intermediate/Advanced), preferred times, and study mode (Online/Offline/Hybrid).",
      icon: <FaUserGraduate className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Browse & match",
      desc: "Use filters to find study partners by subject, level, location, and availability. Check ratings and read short bios.",
      icon: <FaSearch className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Schedule a session",
      desc: "Pick a time that works for both. You can meet online or offline—whatever fits your routine.",
      icon: <FaCalendarAlt className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Learn together",
      desc: "Share resources, set goals, and keep each other accountable. Track progress as you go.",
      icon: <FaComments className="w-6 h-6" />,
    },
  ];

  const faqs = [
    {
      q: "Is StudySync free?",
      a: "Creating a profile and browsing partners is free. Some advanced features may be paid in the future.",
    },
    { q: "How are matches ranked?", a: "We prioritize subject match, experience level, availability overlap, and location/mode preference." },
    { q: "Can I change my level later?", a: "Yes. You can update your profile anytime to reflect your current skill and goals." },
    { q: "Is my data safe?", a: "We use secure authentication and never sell personal data. You control what you share with partners." },
  ];

  return (
    <main className="bg-base-100">
      {/* Hero */}
      <section className="relative">
        <div className=" max-w-7xl mx-auto px-4 md:px-0 pt-10 md:pt-14 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-1 min-w-0">
              <div id="how-it-works" className="flex items-center gap-2 mb-3">
                <span className="badge badge-accent badge-outline">StudySync</span>
                <span className="text-xs opacity-70">Find the right partner. Learn faster.</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                How StudySync Works
              </h1>
              <p className="mt-3 text-base md:text-lg text-base-content/80 max-w-2xl">
                A simple flow to get you learning with the right people—without the hassle. Create your profile, find a match, and start studying.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink to="/register" className="btn btn-primary">Get Started</NavLink>
                <NavLink to="/partners" className="btn btn-ghost">Browse Partners</NavLink>
              </div>
            </div>

            {/* Right side card */}
            <div className="w-full md:w-[420px]">
              <div className="rounded-2xl border border-base-300 bg-base-100 shadow-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FaBolt className="w-5 h-5" />
                  <h3 className="font-bold">It takes ~3 minutes</h3>
                </div>
                <ol className="space-y-2 text-sm">
                  <li>• Fill profile basics</li>
                  <li>• Pick subjects & level</li>
                  <li>• Set your time window</li>
                  <li>• Match & message</li>
                </ol>
                <div className="mt-4 flex gap-2">
                  <NavLink to="/create-partner" className="btn btn-sm btn-primary">Create Profile</NavLink>
                  {/* <NavLink to="/about" className="btn btn-sm btn-ghost">Learn More</NavLink> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.id} className="group rounded-2xl border border-base-300 bg-base-100 hover:shadow-xl transition-shadow p-5">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-base-200 group-hover:bg-base-300 transition-colors">
                  {s.icon}
                </div>
                <h3 className="mt-3 font-bold text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-base-content/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini walkthrough */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="rounded-2xl border border-base-300 bg-base-100 shadow-lg p-5 md:p-6">
              <div className="badge badge-outline mb-3">Smart matching</div>
              <h3 className="text-xl md:text-2xl font-extrabold">Built for focus, not noise</h3>
              <p className="mt-2 text-sm md:text-base text-base-content/80">
                Skip random groups. We prioritize partner quality and time overlap so you can jump straight into real studying.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Filter by subject, level, and location</li>
                <li>• See availability windows at a glance</li>
                <li>• Ratings & short bios keep it authentic</li>
              </ul>
              <div className="mt-5">
                <NavLink to="/partners" className="btn btn-primary btn-sm md:btn-md">Find Partners</NavLink>
              </div>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 shadow-lg p-5 md:p-6">
              <div className="badge badge-outline mb-3">Quick checklist</div>
              <h3 className="text-xl md:text-2xl font-extrabold">Before your first session</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-base">
                <li>• Agree on a topic and time box (e.g., 50 minutes)</li>
                <li>• Share links/resources ahead of time</li>
                <li>• Set one measurable outcome (e.g., solve 10 problems)</li>
                <li>• Wrap with a 5-minute recap</li>
              </ul>
              <div className="mt-5">
                <NavLink to="/register" className="btn btn-ghost btn-sm md:btn-md">Start Now</NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-12 md:pb-20">
        <div id="faq" className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">Frequently asked questions</h2>
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((f, i) => (
              <details key={i} className="collapse collapse-arrow border border-base-300 rounded-2xl bg-base-100">
                <summary className="collapse-title text-sm md:text-base font-medium">{f.q}</summary>
                <div className="collapse-content text-sm text-base-content/80">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <NavLink to="/contact" className="btn btn-primary font-semibold">Let's Get Started ?</NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;