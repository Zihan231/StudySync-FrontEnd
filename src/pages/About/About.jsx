// src/pages/About.jsx
import React from "react";
import { NavLink } from "react-router";
import {
  FaBullseye,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaLightbulb,
  FaChartLine,
} from "react-icons/fa";

const SectionHeader = ({ badge, title, subtitle, center = true }) => (
  <div className={`${center ? "text-center" : ""} max-w-3xl ${center ? "mx-auto" : ""}`}>
    {badge ? <div className="badge badge-outline mb-3">{badge}</div> : null}
    <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
    {subtitle ? <p className="mt-2 text-sm md:text-base text-base-content/80">{subtitle}</p> : null}
  </div>
);

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
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 bg-primary pointer-events-none" />
        <div className="absolute -top-10 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-secondary pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-15 bg-accent pointer-events-none" />

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
                <a href="#faq" className="btn btn-ghost">
                  FAQ
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm text-base-content/70">
                <span className="badge badge-outline">Privacy-first</span>
                <span className="badge badge-outline">Clean UI</span>
                <span className="badge badge-outline">Time-overlap matching</span>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full">
              <div className="card border border-base-300 bg-base-100">
                <div className="card-body p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      <FaUsers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg">Built for collaboration</h3>
                      <p className="text-sm text-base-content/70">Not a noisy group chat. Real study sessions.</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <div className="text-xs opacity-70">Match quality</div>
                      <div className="font-extrabold text-xl">High</div>
                      <div className="mt-2 h-2 rounded-full bg-base-200 overflow-hidden">
                        <div className="h-full w-[85%] bg-primary" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <div className="text-xs opacity-70">Setup time</div>
                      <div className="font-extrabold text-xl">~3 min</div>
                      <div className="mt-2 h-2 rounded-full bg-base-200 overflow-hidden">
                        <div className="h-full w-[70%] bg-secondary" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <NavLink to="/how-it-works" className="btn btn-primary btn-sm md:btn-md">
                      See How It Works
                    </NavLink>
                    <NavLink to="/contact" className="btn btn-ghost btn-sm md:btn-md">
                      Contact
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
              <div
                key={s.label}
                className="card border border-base-300 bg-base-100 hover:shadow-xl transition-shadow"
              >
                <div className="card-body p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs opacity-70">{s.label}</div>
                      <div className="font-extrabold text-lg md:text-xl truncate">{s.value}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="divider my-10 opacity-60" />
        </div>
      </section>

      {/* Values */}
      <section className="pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <SectionHeader
            badge="Values"
            title="What we believe"
            subtitle="A good learning experience is calm, consistent, and built on trust."
          />

          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="group card border border-base-300 bg-base-100 hover:shadow-xl transition-all"
              >
                <div className="card-body p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      {v.icon}
                    </div>
                    <span className="badge badge-accent badge-outline opacity-70 group-hover:opacity-100">
                      Core
                    </span>
                  </div>

                  <h3 className="mt-3 font-extrabold text-lg">{v.title}</h3>
                  <p className="mt-1 text-sm text-base-content/80">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="card border border-base-300 bg-base-200">
            <div className="card-body p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-xl md:text-2xl">
                  Ready to study with someone compatible?
                </div>
                <div className="text-sm md:text-base text-base-content/80 mt-1">
                  Create a profile, set your schedule, and match by overlap.
                </div>
              </div>
              <div className="flex gap-2">
                <NavLink to="/register" className="btn btn-primary">
                  Get Started
                </NavLink>
                <NavLink to="/partners" className="btn btn-ghost">
                  Browse
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Timeline + Team */}
      <section className="pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body p-5 md:p-6">
                <div className="badge badge-outline mb-3">Our story</div>
                <h3 className="text-xl md:text-2xl font-extrabold">
                  From “studying alone” to “studying together”
                </h3>
                <p className="mt-2 text-sm md:text-base text-base-content/80">
                  We built StudySync to help students turn intention into routine—by pairing with someone compatible.
                </p>

                <div className="mt-5">
                  <ul className="steps steps-vertical md:steps-horizontal w-full">
                    {timeline.map((t, idx) => (
                      <li
                        key={t.title}
                        className={`step ${idx === 0 ? "step-primary" : idx === 1 ? "step-secondary" : "step-accent"}`}
                        data-content={idx + 1}
                      >
                        <span className="font-bold">{t.title}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 space-y-3">
                    {timeline.map((t) => (
                      <div key={t.title} className="rounded-2xl border border-base-300 p-4">
                        <div className="font-bold">{t.title}</div>
                        <div className="text-sm text-base-content/80">{t.desc}</div>
                      </div>
                    ))}
                  </div>
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
                    <div
                      key={m.name}
                      className="flex items-center gap-3 rounded-2xl border border-base-300 p-4 bg-base-100"
                    >
                      <div className="avatar placeholder">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center ring-1 ring-base-300 text-primary-content">
                          <span className="text-sm font-extrabold tracking-tight">{m.initials}</span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="font-extrabold">{m.name}</div>
                        <div className="text-sm text-base-content/70">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4">
                  <div className="flex items-center gap-2 font-extrabold">
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

      {/* FAQ */}
      <section id="faq" className="pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <SectionHeader
            badge="FAQ"
            title="Frequently asked questions"
            subtitle="Quick answers to common questions about StudySync."
          />

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="collapse collapse-arrow border border-base-300 rounded-2xl bg-base-100"
              >
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
