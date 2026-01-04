import React, { use, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import AuthContext from "../../contexts/Auth/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [error, SetError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // ✅ Controlled inputs for demo autofill
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const reDirectTo = location.state?.from || "/";

  const { isLoading, signInWithEmailPass, signInWithGoogle, SetUser } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    SetError("");
    setSubmitError("");

    if (!email || !password) {
      SetError("Please fill in all fields.");
      return;
    }

    signInWithEmailPass(email, password)
      .then(() => {
        Swal.fire({
          title: "Login Successful !",
          icon: "success",
          draggable: true,
        }).then(() => navigate(reDirectTo, { replace: true }));
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed !!!",
          icon: "error",
          draggable: true,
        });
        SetError("Invalid Email or Password");
      });
  };

  const onGoogleLogin = () => {
    setSubmitError("");
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Login Successful !",
          icon: "success",
          draggable: true,
        }).then(() => navigate(reDirectTo, { replace: true }));
        SetUser?.(result.user);
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed !!!",
          icon: "error",
          draggable: true,
        });
        setSubmitError("Google sign-in failed.");
      });
  };

  // ✅ Demo button handler
  const handleDemo = () => {
    SetError("");
    setSubmitError("");
    setEmail("Demo@gmail.com");
    setPassword("Demo@123");
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-base-100">
      <div className="w-full max-w-md">
        {/* Brand / Title */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-12 h-12 rounded-2xl grid place-items-center text-primary-content bg-linear-to-br from-primary to-secondary shadow">
            SM
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Welcome back</h1>
          <p className="mt-1 text-base-content/70">Login to continue to StudySync</p>
        </div>

        {/* Card */}
        <div className="card bg-base-200/50 shadow-sm border border-base-300">
          <div className="card-body">
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="input input-bordered w-full"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <div className="label mt-2">
                <span className="label-text">Password</span>
                <NavLink to="/login" className="label-text-alt link link-hover">
                  Forgot password?
                </NavLink>
              </div>

              {/* ⛔ Error box */}
              {(submitError || error) && (
                <div className="mt-4 alert alert-error py-1 font-semibold">
                  {submitError || error}
                </div>
              )}

              {/* Login button */}
              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading && <span className="loading loading-spinner loading-sm" />}
                <span className={isLoading ? "ml-2" : ""}>Login</span>
              </button>

              {/* ✅ Demo account button */}
              <button
                type="button"
                onClick={handleDemo}
                className="btn btn-outline w-full"
                disabled={isLoading}
              >
                Use Demo Account
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-xs">OR</div>

            {/* Google login */}
            <button
              type="button"
              onClick={onGoogleLogin}
              className="btn btn-neutral w-full"
              disabled={isLoading}
              title="Sign in with Google"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" className="mr-2">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.1-.1-2.2-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.6 16.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16 4 9 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.1 0 10.1-2 13.7-5.6l-6.3-5.2C29.3 34.7 26.8 36 24 36c-5.2 0-9.6-3.7-11.2-8.7l-6.6 5.1C9 39.7 16 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.8 6.5-9.3 6.5-5.2 0-9.6-3.7-11.2-8.7l-6.6 5.1C9 39.7 16 44 24 44c10 0 19-7.3 19-20 0-1.1-.1-2.2-.4-3.5z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Register link */}
            <p className="mt-3 text-center text-sm">
              Don’t have an account?{" "}
              <NavLink to="/register" className="link link-primary font-semibold">
                Register
              </NavLink>
            </p>
          </div>
        </div>

        {/* Helper text */}
        <p className="mt-4 text-center text-xs text-base-content/60">
          By logging in, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </main>
  );
};

export default Login;
