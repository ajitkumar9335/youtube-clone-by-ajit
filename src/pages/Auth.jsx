import React, { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        login(res.data);
        navigate("/");
      } else {
        await api.post("/auth/signup", form);
        alert("Account created successfully!");
        setIsLogin(true); // Switch to login mode
      }
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        <form onSubmit={submit} className="flex flex-col gap-4">

          {/* Username - Only for register */}
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                className="w-full border p-3 rounded-lg"
                placeholder="Enter username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border p-3 rounded-lg"
              placeholder="Enter email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border p-3 rounded-lg"
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Switch Button */}
        <p className="text-center mt-5">
          {isLogin ? (
            <span
              onClick={() => setIsLogin(false)}
              className="text-blue-600 cursor-pointer"
            >
              Create account
            </span>
          ) : (
            <span
              onClick={() => setIsLogin(true)}
              className="text-blue-600 cursor-pointer"
            >
              Already have account? Sign In
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
