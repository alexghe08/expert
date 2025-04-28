
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { testConnection } from "@/config/supabase";
import { motion } from "framer-motion";

export const TestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runTests = async () => {
    setIsRunning(true);
    try {
      const connected = await testConnection();
      setTestResults({
        connection: connected,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Eroare la rularea testelor:", error);
      setTestResults({
        connection: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Stare Sistem</h2>
        <Button 
          onClick={runTests}
          disabled={isRunning}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isRunning ? "Se verifică..." : "Verifică Conexiunea"}
        </Button>
      </div>

      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center my-4"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </motion.div>
      )}

      {testResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className={`p-4 rounded-lg ${
            testResults.connection ? "bg-green-50" : "bg-red-50"
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">Stare Conexiune</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                testResults.connection
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {testResults.connection ? "Conectat" : "Deconectat"}
              </span>
            </div>
            {testResults.error && (
              <p className="mt-2 text-sm text-red-600">{testResults.error}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Ultima verificare: {new Date(testResults.timestamp).toLocaleString()}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TestRunner;
