// src/pages/Contact.jsx
import React, { useState } from "react";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value?.trim();
    const email = e.target.email.value?.trim();
    const subject = e.target.subject.value?.trim();
    const message = e.target.message.value?.trim();

    if (!name || !email || !subject || !message) {
      Swal.fire({
        title: "Please fill in all fields.",
        icon: "warning",
        draggable: true,
      });
      return;
    }

    // demo submit (replace with your API / email service)
    try {
      setIsSending(true);
      await new Promise((r) => setTimeout(r, 600));
      Swal.fire({
        title: "Message Sent ✅",
        text: "We’ll get back to you soon.",
        icon: "success",
        draggable: true,
      });
      e.target.reset();
    } catch {
      Swal.fire({
        title: "Failed to send!",
        text: "Please try again.",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-base-100">
      <div className="w-full max-w-5xl">
        {/* Brand / Title */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl grid place-items-center text-primary-content bg-gradient-to-br from-primary to-secondary shadow">
            SS
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Contact us</h1>
          <p className="mt-1 text-base-content/70">
            Need help or have feedback? Send us a message — we usually reply within 24–48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Left info */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200/50 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="font-extrabold text-lg">Reach us</h2>
                <p className="text-sm text-base-content/70">
                  For support, partnerships, or general questions — we’re here.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
                    <div className="w-10 h-10 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold">Email</div>
                      <div className="text-sm text-base-content/70">support@studysync.com</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
                    <div className="w-10 h-10 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      <FaPhoneAlt className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold">Phone</div>
                      <div className="text-sm text-base-content/70">+880 1X00-000000</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
                    <div className="w-10 h-10 rounded-2xl bg-base-200 border border-base-300 grid place-items-center">
                      <FaLocationArrow className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold">Location</div>
                      <div className="text-sm text-base-content/70">Dhaka, Bangladesh</div>
                    </div>
                  </div>
                </div>

                <div className="divider text-xs">Quick links</div>

                <div className="flex flex-wrap gap-2">
                  
                  <NavLink to="/about" className="btn btn-ghost btn-sm">
                    About
                  </NavLink>
                  
                </div>

                <p className="mt-3 text-xs text-base-content/60">
                  Tip: For faster support, include screenshots or the exact error message.
                </p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <div className="card bg-base-200/50 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="font-extrabold text-lg">Send a message</h2>

                <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
                  {/* Name */}
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Name</span>
                    </div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="input input-bordered w-full"
                      autoComplete="name"
                    />
                  </label>

                  {/* Email */}
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Email</span>
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      autoComplete="email"
                    />
                  </label>

                  {/* Subject */}
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Subject</span>
                    </div>
                    <input
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="input input-bordered w-full"
                    />
                  </label>

                  {/* Message */}
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Message</span>
                    </div>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Write your message..."
                      className="textarea textarea-bordered w-full"
                    />
                  </label>
                  <button type="submit" className="btn btn-primary w-full" disabled={isSending}>
                    {isSending && <span className="loading loading-spinner loading-sm" />}
                    <span className={isSending ? "ml-2" : ""}>Send message</span>
                  </button>
                </form>
                <p className="mt-4 text-center text-xs text-base-content/60">
                  By sending this message, you agree to our{" "}
                  <span className="font-semibold">Terms</span> and{" "}
                  <span className="font-semibold">Privacy Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </main>
  );
};
export default Contact;
