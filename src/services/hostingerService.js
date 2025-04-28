
import { toast } from '@/components/ui/use-toast';

const HOSTINGER_API_KEY = '5EzFMT2pbAbTCOR4P6pdRBIGN74gR9KsaElpeQP71ff7fc99';
const HOSTINGER_API_URL = 'https://api.hostinger.com/v1';

export async function initializeHostingerConnection() {
  try {
    const response = await fetch(`${HOSTINGER_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HOSTINGER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to verify Hostinger API connection');
    }

    return true;
  } catch (error) {
    console.error('Hostinger API connection error:', error);
    return false;
  }
}

export async function checkServerStatus() {
  try {
    const response = await fetch(`${HOSTINGER_API_URL}/server/status`, {
      headers: {
        'Authorization': `Bearer ${HOSTINGER_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error('Server status check failed');
    }

    const data = await response.json();
    return data.status === 'running';
  } catch (error) {
    console.error('Server status check error:', error);
    return false;
  }
}

export async function restartServer() {
  try {
    const response = await fetch(`${HOSTINGER_API_URL}/server/restart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HOSTINGER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Server restart failed');
    }

    toast({
      title: "Server restartat cu succes",
      description: "Vă rugăm să așteptați câteva momente pentru ca serverul să revină online."
    });

    return true;
  } catch (error) {
    console.error('Server restart error:', error);
    toast({
      variant: "destructive",
      title: "Eroare la repornirea serverului",
      description: error.message
    });
    return false;
  }
}
