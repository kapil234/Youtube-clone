import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import {
  FaYoutube,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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

  const submit = async (e) => {
    e.preventDefault();

    // Username Validation
    if (!form.username.trim()) {
      return toast.error("Username is required");
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return toast.error(
        "Please enter a valid email address"
      );
    }

    // Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      return toast.error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
    }

    try {
      await registerUser(form);

      toast.success(
        "Registration Successful. Please login."
      );

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <FaYoutube className="text-red-600 text-6xl" />

          <h1 className="text-3xl font-bold mt-3 text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-1">
            Sign up to YouTube Clone
          </p>
        </div>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500"
        />

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
              showPassword ? "text" : "password"
            }
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 pr-12 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 mb-6">
          Password must contain at least 8
          characters, one uppercase letter, one
          lowercase letter, one number and one
          special character.
        </p>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;