import React from "react";
import { NavLink } from "react-router";

/**
 * Props (optional):
 * - onRegister: (data: { name, email, photoURL, password }) => void
 * - onGoogleRegister: () => void
 * - isLoading: boolean
 */
const Register = ({ onRegister, onGoogleRegister, isLoading = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      photoURL: (fd.get("photoURL") || "").toString().trim(),
      password: (fd.get("password") || "").toString(),
    };
    onRegister && onRegister(data);
  };

  return (
    
  );
};

export default Register;
