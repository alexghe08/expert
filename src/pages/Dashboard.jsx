
import React from "react";
import TestRunner from "@/components/TestRunner";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard ExpertAchiziții</h1>
      <div className="grid gap-6">
        <TestRunner />
      </div>
    </div>
  );
}
