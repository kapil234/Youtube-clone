import { useState } from "react";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email:"",
    password:""
  });

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const res = await loginUser(form);

      login(res.data);

      toast.success("Login Successful");

      navigate("/");

    }catch(err){

      toast.error(err.response?.data?.message || "Login Failed");

    }

  }

  return(

    <div className="min-h-screen flex justify-center items-center">

      <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">

      <h1 className="text-3xl font-bold">
      Login
      </h1>

      <input
      placeholder="Email"
      className="w-full p-3 rounded bg-zinc-800"
      onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <input
      type="password"
      placeholder="Password"
      className="w-full p-3 rounded bg-zinc-800"
      onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      <button className="bg-red-600 w-full p-3 rounded">
      Login
      </button>

      <Link
      to="/register"
      className="text-blue-400 block">

      Don't have an account?

      </Link>

      </form>

    </div>

  )

}

export default Login;