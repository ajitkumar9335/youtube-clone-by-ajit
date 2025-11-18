import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header({ onToggleSidebar, onSearch }) {
  const { user, logout } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <header className="w-full bg-white shadow-sm px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-2xl hover:bg-gray-200 p-2 rounded-full"
        >
          ☰
        </button>

        <Link
          to="/"
          className="text-2xl font-bold text-red-600 flex items-center gap-1"
        >
          <span className="text-red-600"></span> YouTube
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={submit}
        className="flex items-center w-1/3 border rounded-full overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button className="px-5 bg-gray-100 hover:bg-gray-200 border-l">
          🔍
        </button>
      </form>

      {/* Auth */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">{user.username}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="border px-4 py-1 rounded-full hover:bg-gray-100"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
