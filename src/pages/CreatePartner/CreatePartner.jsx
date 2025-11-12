import React, { useContext, useMemo, useState } from "react";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";


const CreatePartner = () => {
    const { user, isLoading } = useContext(AuthContext);
    const [error, setError] = useState("");

    // Axios Instance
    const axiosSecure = useAxiosSecure();

    const subjects = useMemo(
        () => ["English", "Mathematics", "Physics", "Programming", "Chemistry", "Biology", "Economics"],
        []
    );
    // Validation function
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


    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear old error
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
            profileimage: (fd.get("profileImage") || "").toString(),
            bio: (fd.get("bio") || "").toString(),
            
        };
        const errorMsg = validateForm(dataInput);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        // DB Logics
        const res = await axiosSecure.post("/create/partner", dataInput);
        const payload = res?.data.result;

        if (payload?.acknowledged && payload?.insertedId) {
            await Swal.fire({
                title: "Profile Created Successfully!",
                text: "Your study profile has been saved to MongoDB.",
                icon: "success",
                confirmButtonText: "OK",
            });
            form.reset();
        } else {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong while saving to MongoDB.",
            });
        }

    };
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-base-100 py-10 px-4 flex justify-center">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-extrabold">Create Partner Profile</h1>
                    <p className="mt-1 text-base-content/70 text-sm md:text-base">
                        Let others find by your subject, availability, and experience.
                    </p>
                </div>

                {/* Card */}
                <div className="card bg-base-200/50 border border-base-300 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Partner's Details</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Full Name</span></div>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Full name"
                                        className="input input-bordered w-full"

                                    />
                                </label>

                                {/* Email (read-only) */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Email</span></div>
                                    <input
                                        name="email"
                                        type="email"
                                        defaultValue={user?.email}
                                        readOnly
                                        className="input input-bordered w-full bg-base-200/60 cursor-not-allowed"
                                    />
                                </label>

                                {/* Profile Image URL */}
                                <label className="form-control md:col-span-2">
                                    <div className="label">
                                        <span className="label-text">Photo URL</span>
                                        <span className="label-text-alt">
                                            Or upload a file below
                                        </span>
                                    </div>
                                    <input
                                        name="profileImage"
                                        type="url"
                                        placeholder="https://your-photo.jpg"
                                        className="input input-bordered w-full"
                                    />
                                </label>
                                {/* Bio */}
                                <label className="form-control md:col-span-2">
                                    <div className="label">
                                        <span className="label-text">Write about the Partner</span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        name="bio"
                                        id="bio"
                                        rows="5"
                                        placeholder="Write a few lines about the partner..."
                                    ></textarea>
                                </label>


                                {/* Subject */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Subject</span></div>
                                    <input
                                        name="subject"
                                        list="subject-list"
                                        placeholder="e.g., English, Math, Programming"
                                        className="input input-bordered w-full"

                                    />
                                    <datalist id="subject-list">
                                        {subjects.map((s) => (
                                            <option key={s} value={s} />
                                        ))}
                                    </datalist>
                                </label>

                                {/* Study Mode */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Study Mode</span></div>
                                    <select name="studyMode" className="select select-bordered w-full" >
                                        <option value="" disabled selected>
                                            Select mode
                                        </option>
                                        <option>Online</option>
                                        <option>Offline</option>
                                    </select>
                                </label>

                                {/* Availability Time */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Availability Time</span></div>
                                    <input
                                        name="availabilityTime"
                                        type="text"
                                        placeholder='e.g., "Evening 6–9 PM"'
                                        className="input input-bordered w-full"

                                    />
                                </label>

                                {/* Location */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Location</span></div>
                                    <input
                                        name="location"
                                        type="text"
                                        placeholder="City, area, or preferred location"
                                        className="input input-bordered w-full"

                                    />
                                </label>

                                {/* Experience Level */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Experience Level</span></div>
                                    <select name="experienceLevel" className="select select-bordered w-full" >
                                        <option value="" disabled selected>
                                            Select level
                                        </option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Expert</option>
                                    </select>
                                </label>

                                {/* Rating */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Rating</span></div>
                                    <input
                                        name="rating"
                                        type="number"
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        placeholder="0–5"
                                        className="input input-bordered w-full"
                                        defaultValue={0}

                                    />
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex items-center justify-end gap-2">
                                <button
                                    type="reset"
                                    className="btn btn-ghost"
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <span className="loading loading-spinner loading-sm mr-2" />
                                    )}
                                    Create Profile
                                </button>
                            </div>
                            {error && (
                                <div className="alert alert-error shadow-sm mt-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01M5.293 17.707a1 1 0 001.414 0L12 12.414l5.293 5.293a1 1 0 001.414-1.414l-6-6a1 1 0 00-1.414 0l-6 6a1 1 0 000 1.414z"
                                        />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                        </form>
                    </div>
                </div>

                {/* Small helper */}
                <p className="mt-3 text-xs text-base-content/60 text-center">
                    You can edit this profile later from <span className="font-semibold">My Connections</span> or your account settings.
                </p>
            </div>
        </main>
    );
};

export default CreatePartner;
