import React, { useContext, useMemo } from "react";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";

/**
 * Props (all optional for now; you wire the logic later):
 * - userEmail?: string                     // current logged-in user email (read-only)
 * - isLoading?: boolean                    // disable while creating
 * - onCreateProfile?: (data) => void       // called with all form fields
 * - onUploadImage?: (file: File) => Promise<string> | void  // should return uploaded URL (optional)
 */
const CreatePartner = () => {
    const { user, isLoading } = useContext(AuthContext);
    const subjects = useMemo(
        () => ["English", "Mathematics", "Physics", "Programming", "Chemistry", "Biology", "Economics"],
        []
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            name: (fd.get("name") || "").toString().trim(),
            subject: (fd.get("subject") || "").toString().trim(),
            studyMode: (fd.get("studyMode") || "").toString(),
            availabilityTime: (fd.get("availabilityTime") || "").toString().trim(),
            location: (fd.get("location") || "").toString().trim(),
            experienceLevel: (fd.get("experienceLevel") || "").toString(),
            rating: Number(fd.get("rating") || 0),
            partnerCount: 0,
            email: (fd.get("email") || "").toString(),
        };
        console.log(data);
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
                                        required
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
                                        name="profileimage"
                                        type="url"
                                        placeholder="https://your-photo.jpg"
                                        className="input input-bordered w-full"
                                    />
                                </label>

                                {/* Subject */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Subject</span></div>
                                    <input
                                        name="subject"
                                        list="subject-list"
                                        placeholder="e.g., English, Math, Programming"
                                        className="input input-bordered w-full"
                                        required
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
                                    <select name="studyMode" className="select select-bordered w-full" required>
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
                                        required
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
                                        required
                                    />
                                </label>

                                {/* Experience Level */}
                                <label className="form-control">
                                    <div className="label"><span className="label-text">Experience Level</span></div>
                                    <select name="experienceLevel" className="select select-bordered w-full" required>
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
                                        required
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
