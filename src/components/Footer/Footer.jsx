// src/components/Layout/Footer.jsx
import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-base-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Logo + name */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-2xl grid place-items-center text-primary-content bg-linear-to-br from-primary to-secondary shadow">
                                SM
                            </div>
                            <h2 className="text-xl font-extrabold">StudyMate</h2>
                        </div>
                        <p className="text-sm text-base-content/70 leading-relaxed max-w-xs">
                            StudyMate is a smart academic networking platform where learners
                            connect, collaborate, and grow together through shared study
                            sessions and subject-based groups.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-base-content/90">Explore</h3>
                        <nav className="flex flex-col space-y-1 text-sm text-base-content/70">
                            <NavLink to="/" className="hover:text-primary">
                                Home
                            </NavLink>
                            <NavLink to="/partners" className="hover:text-primary">
                                Find Partners
                            </NavLink>
                        </nav>
                    </div>

                    {/* Social links (React Icons) */}
                    <div>
                        <h3 className="font-semibold text-base-content/90 mb-2">
                            Follow Us
                        </h3>
                        <div className="flex gap-4 text-base-content/70">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="hover:text-primary transition"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="hover:text-primary transition"
                            >
                                <FaXTwitter size={18} />

                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="hover:text-primary transition"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="hover:text-primary transition"
                            >
                                <FaInstagram size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider my-6"></div>

                {/* Bottom copyright */}
                <div className="text-center text-sm text-base-content/60">
                    © {new Date().getFullYear()} StudyMate — All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
