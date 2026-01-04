// src/pages/Dashboard/DashboardCreateProfile.jsx
import React, { useContext, useMemo, useState } from "react";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const DashboardCreateProfile = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ local loader for submit
  const axiosSecure = useAxiosSecure();

  const subjects = useMemo(
    () => [
      "English",
      "Mathematics",
      "Physics",
      "Programming",
      "Chemistry",
      "Biology",
      "Statistics",
      "Economics",
      "History",
    ],
    []
  );

  const validateForm = (data) => {
    if (!data.name) return "Name is required.";
    if (!data.profileimage) return "Photo URL is required.";
    if (!data.bio) return "Bio details is required.";
    if (!data.subject) return "Subject is required.";
    if (!data.studyMode) return "Please select a study mode.";
    if (!data.availabilityTime) return "Availability time is required.";
    if (!data.location) return "Location is required.";
    if (!data.experienceLevel) return "Please select an experience level.";
    if (isNaN(data.rating) || data.rating < 0 || data.rating > 5)
      return "Rating must be a number between 0 and 5.";
    if (!data.email) return "Email is required.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const dataInput = {
      name: (fd.get("name") || "").toString().trim(),
      subject: (fd.get("subject") || "").toString().trim(),
      studyMode: (fd.get("studyMode") || "").toString(),
      availabilityTime: (fd.get("availabilityTime") || "").toString().trim(),
      location: (fd.get("location") || "").toString().trim(),
      experienceLevel: (fd.get("experienceLevel") || "").toString(),
      rating: Number(fd.get("rating") || 0),
      partnerCount: 0,
      email: (fd.get("email") || "").toString(),
      profileimage: (fd.get("profileImage") || "").toString().trim(),
      bio: (fd.get("bio") || "").toString().trim(),
    };

    const errorMsg = validateForm(dataInput);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setIsSubmitting(true); // ✅ show loader immediately on click
    try {
      const res = await axiosSecure.post("/create/partner", dataInput);
      const payload = res?.data?.result;

      if (payload?.acknowledged && payload?.insertedId) {
        await Swal.fire({
          title: "Profile Created Successfully!",
          text: "Your study profile has been saved.",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while saving.",
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Could not save profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false); // ✅ stop loader
    }
  };

  const busy = isLoading || isSubmitting; // ✅ one flag for disable/loader

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-accent badge-outline">Create Profile</span>
          <span className="text-xs opacity-70">Set your study details</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold">Create Partner Profile</h1>
        <p className="mt-1 text-sm md:text-base text-base-content/70">
          Let others find you by subject, availability, and experience.
        </p>
      </div>

      {/* Card */}
      <div className="card bg-base-200/50 border border-base-300 shadow-sm relative">
        {/* ✅ Optional overlay loader (looks nice in dashboard) */}
        {isSubmitting && (
          <div className="absolute inset-0 z-10 rounded-2xl bg-base-100/60 backdrop-blur-[2px] flex items-center justify-center">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-base-300 bg-base-100 shadow-sm">
              <span className="loading loading-spinner loading-sm" />
              <span className="font-semibold text-sm">Creating profile...</span>
            </div>
          </div>
        )}

        <div className="card-body p-5 md:p-6">
          <h2 className="font-extrabold text-lg">Partner Details</h2>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Full Name</span>
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered w-full"
                  disabled={busy}
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
                  defaultValue={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
                  disabled={busy}
                />
              </label>

              {/* Photo URL */}
              <label className="form-control md:col-span-2">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                  <span className="label-text-alt">Paste image URL</span>
                </div>
                <input
                  name="profileImage"
                  type="url"
                  placeholder="https://your-photo.jpg"
                  className="input input-bordered w-full"
                  disabled={busy}
                />
              </label>

              {/* Bio */}
              <label className="form-control md:col-span-2">
                <div className="label">
                  <span className="label-text">Bio</span>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full"
                  name="bio"
                  rows="5"
                  placeholder="Write a few lines about yourself..."
                  disabled={busy}
                />
              </label>

              {/* Subject */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Subject</span>
                </div>
                <input
                  name="subject"
                  list="subject-list"
                  placeholder="e.g., English, Math, Programming"
                  className="input input-bordered w-full"
                  disabled={busy}
                />
                <datalist id="subject-list">
                  {subjects.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </label>

              {/* Study Mode */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Study Mode</span>
                </div>
                <select
                  name="studyMode"
                  className="select select-bordered w-full"
                  defaultValue=""
                  disabled={busy}
                >
                  <option value="" disabled>
                    Select mode
                  </option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </label>

              {/* Availability */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Availability Time</span>
                </div>
                <input
                  name="availabilityTime"
                  type="text"
                  placeholder='e.g., "Evening 6–9 PM"'
                  className="input input-bordered w-full"
                  disabled={busy}
                />
              </label>

              {/* Location */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Location</span>
                </div>
                <input
                  name="location"
                  type="text"
                  placeholder="City, area, or preferred place"
                  className="input input-bordered w-full"
                  disabled={busy}
                />
              </label>

              {/* Experience */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Experience Level</span>
                </div>
                <select
                  name="experienceLevel"
                  className="select select-bordered w-full"
                  defaultValue=""
                  disabled={busy}
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </label>

              {/* Rating */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Rating</span>
                </div>
                <input
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="0–5"
                  className="input input-bordered w-full"
                  defaultValue={0}
                  disabled={busy}
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="alert alert-error shadow-sm mt-4">
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-2">
              <button type="reset" className="btn btn-ghost" disabled={busy}>
                Reset
              </button>

              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy && <span className="loading loading-spinner loading-sm mr-2" />}
                {isSubmitting ? "Creating..." : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateProfile;
