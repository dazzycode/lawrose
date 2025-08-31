import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://lawrose-apps.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store tokens
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        navigate("/dashboard"); // Change this to your landing page after login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://lawrose-apps.onrender.com/api/auth/google";
  };

  return (
    <div className="min-h-screen overflow-x-hidden scroll-smooth flex">
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
          <h2 className="text-2xl font-semibold mb-1">Account Login</h2>
          <p className="text-sm text-gray-500 mb-8">
            If you are already a member, you can login with your email address and password.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
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

            <div className="mb-4 flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 accent-[#B4BD00] border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-xs text-black"
              >
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B4BD00] text-white font-medium py-2 rounded-md hover:bg-[#a5ad00] transition"
            >
              {loading ? "Logging in..." : "Continue"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full pt-4 mb-8 rounded-md hover:bg-gray-50 transition mt-6"
          >
            <FcGoogle size={20} className="mr-2" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>

          <p className="text-black/50 text-xs text-center mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-[#B4BD00] hover:text-black">
              Sign up here
            </a>
          </p>
          <p className="text-black/50 mt-6 text-xs text-center mt-2">
            <a href="/">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}
