
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "@/services/authService";
import { cn } from "@/lib/utils";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Emailul este obligatoriu";
    if (!password.trim()) newErrors.password = "Parola este obligatorie";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log('Attempting login with:', email);
      await signIn(email, password);
      toast({
        title: "Autentificare reușită",
        description: "Bine ați venit în aplicație!",
      });
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ auth: error.message });
      toast({
        title: "Eroare de autentificare",
        description: error.message || "Email sau parolă incorectă. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Autentificare
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Introduceți datele de conectare
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={cn(
                  "mt-1 bg-white/50",
                  errors.email && "border-red-500 focus-visible:ring-red-500"
                )}
                placeholder="nume@exemplu.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Parolă</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  "mt-1 bg-white/50",
                  errors.password && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.auth && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-600">{errors.auth}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Se procesează..." : "Autentificare"}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>Credențiale de test:</p>
            <p>Email: razvan@admin.com</p>
            <p>Parolă: 25061977</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
