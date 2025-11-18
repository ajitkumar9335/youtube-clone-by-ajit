import React from "react";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const menu = [
    { name: "Home", icon: <AiOutlineHome size={22} />, path: "/" },
    { name: "Shorts", icon: <PiYoutubeLogoFill size={22} />,  },
    { name: "Subscriptions", icon: <MdSubscriptions size={22} />,  },
    { name: "You", icon: <BiUserCircle size={22} />},
    { name: "History", icon: <AiOutlineHistory size={22} />, },
  ];

  return (
    <aside
      className={`
        fixed top-16 le0vh-2rem)]
        bg-white text-black
        border-r border-gray-300 transition-all duration-300 
        flex flex-col
        ${isOpen ? "w-56" : "w-20"}
      `}
    >
      <nav className="flex flex-col py-4">
        {menu.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`
              flex items-center gap-4 text-gray-800 
              hover:bg-gray-200 py-2 rounded-xl 
              transition-all duration-200
              ${isOpen ? "pl-4 justify-start" : "justify-center"}
            `}
          >
            {item.icon}
            {isOpen && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
