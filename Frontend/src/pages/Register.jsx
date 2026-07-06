import { useState } from "react";
import { registerUser } from "../../services/authApi";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {

const navigate = useNavigate();

const [form,setForm]=useState({

username:"",
email:"",
password:""

});

const submit=async(e)=>{

e.preventDefault();

try{

await registerUser(form);

toast.success("Registration Successful");

navigate("/login");

}catch(err){

toast.error(err.response?.data?.message || "Registration Failed");

}

}

return(

<div className="min-h-screen flex justify-center items-center">

<form
onSubmit={submit}
className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4">

<h1 className="text-3xl font-bold">

Register

</h1>

<input
placeholder="Username"
className="w-full p-3 rounded bg-zinc-800"
onChange={(e)=>setForm({...form,username:e.target.value})}
/>

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

Register

</button>

<Link to="/login" className="text-blue-400">

Already have an account?

</Link>

</form>

</div>

)

}

export default Register;