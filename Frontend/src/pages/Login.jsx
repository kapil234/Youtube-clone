import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      login(res.data);

      toast.success("Login Successful");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
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
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 outline-none focus:border-blue-500"
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
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