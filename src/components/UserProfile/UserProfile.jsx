// src/components/Profile/UserProfile.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router"; // per your preference
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-base-100">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto mb-3 w-12 h-12 rounded-2xl grid place-items-center text-primary-content bg-linear-to-br from-primary to-secondary shadow">
                        SM
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold">User Profile</h1>
                    <p className="mt-1 text-base-content/70">Your StudySync identity</p>
                </div>

                {/* Card */}
                <div className="card bg-base-200/50 border border-base-300 shadow-sm">
                    <div className="card-body">
                        {/* Top: avatar + name/email */}
                        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                            <div className="w-24 h-24 rounded-full ring ring-primary/30 ring-offset-2 ring-offset-base-100 overflow-hidden shrink-0">
                                <img
                                    alt={`${user?.displayName} avatar`}
                                    src={user?.photoURL}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-center sm:text-left">
                                <h2 className="text-xl md:text-2xl font-bold">{user?.displayName}</h2>
                                <p className="text-sm md:text-base text-base-content/70 break-all">
                                    {user?.email}
                                </p>
                            </div>
                        </section>

                        <div className="divider my-4" />

                        {/* Details grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-lg border border-base-300 bg-base-100/60 p-4">
                                <span className="block text-xs uppercase tracking-wide text-base-content/60 mb-1">
                                    Name
                                </span>
                                <span className="font-semibold">{user?.displayName}</span>
                            </div>

                            <div className="rounded-lg border border-base-300 bg-base-100/60 p-4">
                                <span className="block text-xs uppercase tracking-wide text-base-content/60 mb-1">
                                    Email
                                </span>
                                <a
                                    href={`mailto:${user?.email}`}
                                    className="font-semibold break-all link link-primary"
                                >
                                    {user?.email}
                                </a>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className="card-actions justify-end mt-4">
                            <NavLink to="/" className="btn btn-primary">
                                Home
                            </NavLink>
                            {/* <NavLink to="/settings" className="btn btn-ghost">
                Edit Profile
              </NavLink> */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserProfile;
