
import { toast } from '@/components/ui/use-toast';

export async function signIn(email, password) {
  toast({
    variant: "destructive",
    title: "Autentificare indisponibilă",
    description: "Vă rugăm să configurați mai întâi conexiunea la baza de date."
  });
  return null;
}

export async function signOut() {
  toast({
    title: "Deconectare reușită",
    description: "La revedere!"
  });
}

export async function getCurrentUser() {
  return null;
}

export async function resetPassword(email) {
  toast({
    variant: "destructive",
    title: "Resetare parolă indisponibilă",
    description: "Vă rugăm să configurați mai întâi conexiunea la baza de date."
  });
}
