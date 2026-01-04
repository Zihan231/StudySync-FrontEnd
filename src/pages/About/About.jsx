import React from "react";
import { NavLink } from "react-router";
import {
  FaBullseye,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaLightbulb,
  FaChartLine,
  FaQuoteLeft,
} from "react-icons/fa";

const About = () => {
  const stats = [
    { label: "Built for", value: "Students", icon: <FaUsers className="w-5 h-5" /> },
    { label: "Focus", value: "Better matching", icon: <FaBullseye className="w-5 h-5" /> },
    { label: "Goal", value: "Consistent progress", icon: <FaChartLine className="w-5 h-5" /> },
    { label: "Promise", value: "Privacy-first", icon: <FaShieldAlt className="w-5 h-5" /> },
  ];

  const values = [
    {
      title: "Real matches, not noise",
      desc: "We help you find partners based on subject, level, and availability overlap—so sessions actually happen.",
      icon: <FaBullseye className="w-6 h-6" />,
    },
    {
      title: "Accountability > motivation",
      desc: "Study gets easier when someone’s walking the path with you. We’re built for consistency.",
      icon: <FaHandshake className="w-6 h-6" />,
    },
    {
      title: "Respect & safety",
      desc: "You control what you share. We prioritize safe interactions and responsible community behavior.",
      icon: <FaShieldAlt className="w-6 h-6" />,
    },
    {
      title: "Simple, modern learning",
      desc: "Clean UI. Quick actions. Fewer distractions—so you can focus on learning faster.",
      icon: <FaLightbulb className="w-6 h-6" />,
    },
  ];

  const timeline = [
    {
      title: "The idea",
      desc: "Most students don’t need more content—they need the right people and consistent sessions.",
    },
    {
      title: "Built around matching",
      desc: "We designed StudySync to prioritize overlap: topic + level + time + study mode.",
    },
    {
      title: "Community-first growth",
      desc: "We aim to grow with trust: clear rules, respectful behavior, and privacy-friendly design.",
    },
  ];

  const team = [
    { name: "Product & UX", role: "Designing a calm study experience", initials: "PU" },
    { name: "Engineering", role: "Fast, reliable, and secure platform", initials: "EN" },
    { name: "Community", role: "Healthy connections and support", initials: "CM" },
  ];

  const testimonials = [
    {
      quote:
        "I stopped wasting time in random groups. StudySync helped me find someone with the same level and schedule.",
      name: "A student",
      meta: "Matched by availability",
    },
    {
      quote:
        "The checklist idea made our sessions productive. We started setting outcomes and actually finishing topics.",
      name: "A learner",
      meta: "Goal-based sessions",
    },
  ];

  const faqs = [
    {
      q: "What makes StudySync different?",
      a: "StudySync focuses on real compatibility: subject + level + time overlap + study mode (online/offline). That reduces drop-offs and improves consistency.",
    },
    {
      q: "Do I have to share my personal info?",
      a: "No. Share only what you’re comfortable with. You control your bio and visibility, and we prioritize privacy-first defaults.",
    },
    {
      q: "Can I use it for offline study too?",
      a: "Yes—choose Online, Offline, or Hybrid. You can also filter partners by location and preference.",
    },
    {
      q: "How do ratings work?",
      a: "Ratings are meant to reflect session quality and reliability. Always keep feedback respectful and constructive.",
    },
  ];

  return (
    <main className="bg-base-100">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-0 pt-10 md:pt-14 pb-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-accent badge-outline">About</span>
                <span className="text-xs opacity-70">StudySync — learn with the right people</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                We help students study consistently with better partners
              </h1>

              <p className="mt-3 text-base md:text-lg text-base-content/80 max-w-2xl">
                StudySync is built to reduce distractions and help you connect with compatible study partners.
                Match by subject, level, time window, and study mode—then build momentum together.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <NavLink to="/register" className="btn btn-primary">
                  Create Account
                </NavLink>
                <NavLink to="/partners" className="btn btn-ghost">
                  Explore Partners
                </NavLink>
              </div>

              <div className="mt-5 text-sm text-base-content/70">
                <span className="font-semibold">Our promise:</span> privacy-first, respectful community, and a clean experience.
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full">
              <div className="card border border-base-300 bg-base-100">
                <div className="card-body p-5 md:p-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-base-200">
                      <FaUsers className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg">Built for collaboration</h3>
                      <p className="text-sm text-base-content/70">Not a noisy group chat. Real study sessions.</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <div className="text-xs opacity-70">Match quality</div>
                      <div className="font-extrabold text-xl">High</div>
                    </div>
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <div className="text-xs opacity-70">Setup time</div>
                      <div className="font-extrabold text-xl">~3 min</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <NavLink to="/how-it-works" className="btn btn-primary btn-sm md:btn-md">
                      See How It Works
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="card border border-base-300 bg-base-100">
                <div className="card-body p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-base-200">
                      {s.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs opacity-70">{s.label}</div>
                      <div className="font-extrabold text-lg md:text-xl truncate">{s.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold">What we believe</h2>
            <p className="mt-2 text-sm md:text-base text-base-content/80">
              A good learning experience is calm, consistent, and built on trust.
            </p>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((v) => (
              <div key={v.title} className="card border border-base-300 bg-base-100 hover:shadow-xl transition-shadow">
                <div className="card-body p-5">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-base-200">
                    {v.icon}
                  </div>
                  <h3 className="mt-3 font-bold text-lg">{v.title}</h3>
                  <p className="mt-1 text-sm text-base-content/80">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body p-5 md:p-6">
                <div className="badge badge-outline mb-3">Our story</div>
                <h3 className="text-xl md:text-2xl font-extrabold">From “studying alone” to “studying together”</h3>
                <p className="mt-2 text-sm md:text-base text-base-content/80">
                  We built StudySync to help students turn intention into routine—by pairing with someone compatible.
                </p>

                <div className="mt-5 space-y-4">
                  {timeline.map((t, idx) => (
                    <div key={t.title} className="flex gap-3">
                      <div className="mt-1">
                        <div className="w-9 h-9 rounded-xl bg-base-200 border border-base-300 flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold">{t.title}</div>
                        <div className="text-sm text-base-content/80">{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <NavLink to="/partners" className="btn btn-primary btn-sm md:btn-md">
                    Find a Partner
                  </NavLink>
                  <NavLink to="/contact" className="btn btn-ghost btn-sm md:btn-md">
                    Contact Us
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="card border border-base-300 bg-base-100">
              <div className="card-body p-5 md:p-6">
                <div className="badge badge-outline mb-3">Team</div>
                <h3 className="text-xl md:text-2xl font-extrabold">Small team, big focus</h3>
                <p className="mt-2 text-sm md:text-base text-base-content/80">
                  We’re building a focused platform that respects your time and supports meaningful study sessions.
                </p>

                <div className="mt-5 space-y-3">
                  {team.map((m) => (
                    <div key={m.name} className="flex items-center gap-3 rounded-2xl border border-base-300 p-4 bg-base-100">
                      <div className="avatar placeholder">
                        <div className="bg-base-200 text-base-content rounded-xl w-12">
                          <span className="font-bold">{m.initials}</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold">{m.name}</div>
                        <div className="text-sm text-base-content/70">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4">
                  <div className="flex items-center gap-2 font-bold">
                    <FaShieldAlt className="w-4 h-4" />
                    Privacy & Safety
                  </div>
                  <p className="mt-1 text-sm text-base-content/80">
                    You control your profile details. We aim for secure authentication and respectful interactions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold">What learners say</h2>
            <p className="mt-2 text-sm md:text-base text-base-content/80">
              A good partner can change everything—focus, confidence, and consistency.
            </p>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.quote} className="card border border-base-300 bg-base-100">
                <div className="card-body p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-base-200">
                      <FaQuoteLeft className="w-5 h-5" />
                    </span>
                    <p className="text-sm md:text-base text-base-content/80">{t.quote}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-base-content/60">{t.meta}</div>
                    </div>
                    <span className="badge badge-accent badge-outline">StudySync</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
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
            <NavLink to="/register" className="btn btn-primary font-semibold">
              Join StudySync
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
