// src/components/Layout/Footer.jsx
import React from "react";
import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-base-300 mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Logo + name */}
                    <div>
                        <div className="flex-1">
                            <NavLink to="/" className="btn btn-ghost px-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-2xl grid place-items-center text-primary-content bg-gradient-to-br from-primary to-secondary shadow-sm ring-1 ring-base-300">
                                        <FaBookOpen className="w-5 h-5" />
                                    </div>

                                    <div className="flex flex-col leading-none">
                                        <span className="text-lg md:text-xl font-extrabold tracking-tight">
                                            Study<span className="text-secondary">Sync</span>
                                        </span>
                                        <span className="text-[11px] md:text-xs text-base-content/60">
                                            Find • Match • Study
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <p className="text-sm text-base-content/70 leading-relaxed max-w-xs mt-8">
                            StudySync is a smart academic networking platform where learners
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
                            <NavLink to="/about" className="hover:text-primary">
                                About
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
                                href="https://www.facebook.com/Zihan231"
                                target="_blank"
                                aria-label="Facebook"
                                className="hover:text-primary transition"
                            >
                                <FaFacebookF size={18} />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                aria-label="Twitter"
                                className="hover:text-primary transition"
                            >
                                <FaXTwitter size={18} />

                            </a>
                            <a
                                href="https://www.linkedin.com/in/zihan231"
                                target="_blank"
                                aria-label="LinkedIn"
                                className="hover:text-primary transition"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/zihan_islam_19"
                                target="_blank"
                                aria-label="Instagram"
                                className="hover:text-primary transition"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="https://github.com/Zihan231"
                                target="_blank"
                                aria-label="GitHub"
                                className="hover:text-primary transition"
                            >
                                <FaGithubSquare size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="divider my-6"></div>

                {/* Bottom copyright */}
                <div className="text-center text-sm text-base-content/60">
                    © {new Date().getFullYear()} <span className="text-primary">StudySync</span> — All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
