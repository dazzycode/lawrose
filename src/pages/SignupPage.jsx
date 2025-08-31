import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://lawrose-apps.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // If the API sends tokens right after signup
        if (data.data?.accessToken) {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          navigate("/dashboard"); // Adjust to your landing page
        } else {
          navigate("/login"); // If tokens are sent only after email verification
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "https://lawrose-apps.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex">
      {/* Left Image Section */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/signup.png')",
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center md:w-1/2 w-full px-8 md:px-16 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
          <FiArrowLeft size={22} />
        </button>

        <div className="max-w-sm w-full">
          <h2 className="text-2xl font-semibold mb-1">Account Signup</h2>
          <p className="text-xs md:text-sm text-gray-500 mb-8">
            Become a member and enjoy exclusive promotions.
          </p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B4BD00]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B4BD00]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B4BD00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B4BD00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B4BD00] text-white font-medium py-2 rounded-md hover:bg-[#a5ad00] transition"
            >
              {loading ? "Signing up..." : "Continue"}
            </button>

            <p className="text-black text-xs md:text-sm text-center mt-2">
              Already have an account?{" "}
              <a href="/login" className="underline text-[#B4BD00] hover:text-black">
                Login
              </a>
            </p>
          </form>

          <button
            onClick={handleGoogleSignup}
            className="flex items-center justify-center w-full py-8 rounded-md hover:bg-gray-50 transition mt-6"
          >
            <FcGoogle size={20} className="mr-2" />
            <span className="text-xs md:text-sm font-medium">Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
