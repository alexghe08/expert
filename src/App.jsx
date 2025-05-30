
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ReferatPage from "@/pages/ReferatPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<ReferatPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
