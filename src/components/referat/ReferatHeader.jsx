
import React from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

function ReferatHeader({ handleDownloadPDF, loading }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Referat de Necesitate</h1>
      <Button
        variant="outline"
        onClick={handleDownloadPDF}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <FileDown className="w-4 h-4" />
        Export PDF
      </Button>
    </div>
  );
}

export default ReferatHeader;
