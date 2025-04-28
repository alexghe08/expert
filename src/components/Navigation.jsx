
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, BookOpen, Target, FileSpreadsheet } from "lucide-react";

function Navigation() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard", icon: FileText },
    { path: "/referat", label: "Referat", icon: FileText },
    { path: "/caiet", label: "Caiet de Sarcini", icon: BookOpen },
    { path: "/strategie", label: "Strategie", icon: Target },
    { path: "/fisa-date", label: "Fișa de Date", icon: FileSpreadsheet },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
