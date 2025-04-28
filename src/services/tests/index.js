
import { testConnection } from "./connectionTest";
import { testDocumentFlow } from "./documentTest";
import { testValidation } from "./validationTest";
import { toast } from "@/components/ui/use-toast";

export async function runAllTests() {
  const results = {
    connection: await testConnection(),
    documents: await testDocumentFlow(),
    validation: await testValidation()
  };

  const allPassed = Object.values(results).every(r => r.success);

  if (allPassed) {
    toast({
      title: "Teste complete",
      description: "Toate sistemele funcționează corect",
      duration: 3000,
    });
  } else {
    const failures = Object.entries(results)
      .filter(([, result]) => !result.success)
      .map(([name]) => name)
      .join(", ");

    toast({
      variant: "destructive",
      title: "Erori detectate",
      description: `Probleme la: ${failures}`,
      duration: 5000,
    });
  }

  return {
    success: allPassed,
    results,
    timestamp: new Date().toISOString()
  };
}
