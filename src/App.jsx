import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";



export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col">
      
      <Header 
        onToggleSidebar={() => setSidebarOpen(prev => !prev)} 
        onSearch={(q) => setSearchText(q)}
      />

      <div className="flex w-full">
        
        {/* Sidebar on top of content (fixed) */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main content starts AFTER sidebar width */}
        <main
          className={`
            flex-1 transition-all duration-300
            ${sidebarOpen ? "ml-56" : "ml-20"}
          `}
        >
          <Outlet context={{ searchText, sidebarOpen }} />
        </main>
      </div>
    </div>
  );
}
