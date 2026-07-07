import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  FaYoutube,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Please enter a valid email address"
      );
    }

    // Password validation
    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    try {
      const res = await loginUser(form);

      // Store user + JWT
      login(res.data);

      toast.success("Login Successful");

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <FaYoutube className="text-red-600 text-6xl" />

          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            Sign In
          </h1>

          <p className="text-gray-500 mt-1">
            Continue to YouTube Clone
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 pr-12 mb-6 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 -mt-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;