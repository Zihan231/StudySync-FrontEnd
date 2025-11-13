import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth"; // ✅ use your own Update() helper if you prefer
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, isLoading, signInWithGoogle, SetUser } = useContext(AuthContext);
  const location = useLocation();
  const reDirectTo = location.state?.from || '/';
  const navigate = useNavigate();
  const [pwError, setPwError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validatePassword = (pwd) => {
    const problems = [];
    if (!/[A-Z]/.test(pwd)) problems.push("at least one uppercase letter");
    if (!/[a-z]/.test(pwd)) problems.push("at least one lowercase letter");
    if (pwd.length < 6) problems.push("minimum 6 characters");
    return problems;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const imgUrl = (fd.get("photoURL") || "").toString().trim();
    const password = (fd.get("password") || "").toString();

    // ✅ Password validation
    const pwProblems = validatePassword(password);
    if (pwProblems.length > 0) {
      setPwError(`${pwProblems.join(", ")}.`);
      return;
    }
    setPwError("");

    // 🔐 Firebase Auth starts from here
    createUser(email, password)
      .then((result) => {
        const receivedUser = result.user;
        return updateProfile(receivedUser, {
          displayName: name,
          photoURL: imgUrl,
        }).then(() => {
          SetUser({ ...receivedUser, displayName: name, photoURL: imgUrl });
          Swal.fire({
            title: "Account created successfully !",
            icon: "success",
            draggable: true
          }).then(navigate(reDirectTo, { replace: true }));
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed !!!",
          icon: "error",
          draggable: true
        })
        setSubmitError("Something went wrong !!!");
      });
  };


  // Google Sign Up
  const onGoogleRegister = () => {
    setSubmitError("");
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Account created successfully !",
          icon: "success",
          draggable: true
        }).then(navigate(reDirectTo, { replace: true }));
        SetUser?.(result.user);
      })
      .catch((err) => {
        Swal.fire({
          title: "Login Failed !!!",
          icon: "error",
          draggable: true
        })
        setSubmitError("Google sign-in failed.");
      });
  };


  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-base-100">
      <div className="w-full max-w-md">
        {/* Brand / Title */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl grid place-items-center text-primary-content bg-linear-to-br from-primary to-secondary shadow">
            SM
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Create your account</h1>
          <p className="mt-1 text-base-content/70">Join StudyMate and find your perfect study partners.</p>
        </div>

        {/* Card */}
        <div className="card bg-base-200/50 shadow-sm border border-base-300">
          <div className="card-body">
            <h2 className="card-title">Register</h2>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="input input-bordered w-full"
                  required
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
                  required
                  autoComplete="email"
                />
              </label>

              {/* Photo URL */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  name="photoURL"
                  type="url"
                  placeholder="https://your-photo.jpg"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Password */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${pwError ? "input-error" : ""}`}
                  required
                  autoComplete="new-password"
                />
                <div className="label w-1/2">
                  {pwError ? (
                    <span className="label-text-alt text-error">{pwError}</span>
                  ) : (
                    <span className="label-text-alt text-base-content/60">
                      Must have at least 1 uppercase, 1 lowercase, and 6+ characters.
                    </span>
                  )}
                </div>
              </label>
              {/* ⛔ Error box below the form (shows pwError or submitError) */}
              {(submitError) && (
                <div className="mt-4 alert alert-error py-1 font-semibold">
                  {submitError}
                </div>
              )}
              {/* Submit */}
              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading && <span className="loading loading-spinner loading-sm" />}
                <span className={isLoading ? "ml-2" : ""}>Register</span>
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-xs">OR</div>

            {/* Google Registration */}
            <button
              type="button"
              onClick={onGoogleRegister}
              className="btn btn-neutral w-full"
              disabled={isLoading}
              title="Sign up with Google"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" className="mr-2">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16 4 9 8.3 6.3 14.7z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16 4 9 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.1 0 10.1-2 13.7-5.6l-6.3-5.2C29.3 34.7 26.8 36 24 36c-5.2 0-9.6-3.7-11.2-8.7l-6.6 5.1C9 39.7 16 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.8 6.5-9.3 6.5-5.2 0-9.6-3.7-11.2-8.7l-6.6 5.1C9 39.7 16 44 24 44c10 0 19-7.3 19-20 0-1.1-.1-2.2-.4-3.5z" />
              </svg>
              Continue with Google
            </button>

            {/* Login link */}
            <p className="mt-3 text-center text-sm">
              Already have an account?{" "}
              <NavLink to="/login" className="link link-primary font-semibold">
                Login
              </NavLink>
            </p>


          </div>
        </div>

        {/* Helper text (optional) */}
        <p className="mt-4 text-center text-xs text-base-content/60">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default Register;
