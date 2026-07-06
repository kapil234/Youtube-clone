import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
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
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 outline-none focus:border-blue-500"
        />

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

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
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