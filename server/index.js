
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { testConnection } from '@/config/supabase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://whrpnqvnujhzqljjmxum.supabase.co",
        "wss://whrpnqvnujhzqljjmxum.supabase.co",
        "https://*.app-preview.com",
        "https://*.supabase.co",
        "wss://*.supabase.co",
        "https://*.hostinger.com",
        "https://*.hostingervps.com"
      ],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "data:", "https:"],
      mediaSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'https://whrpnqvnujhzqljjmxum.supabase.co',
    /^https:\/\/.*\.app-preview\.com$/,
    /^https:\/\/.*\.supabase\.co$/,
    /^https:\/\/.*\.hostinger\.com$/,
    /^https:\/\/.*\.hostingervps\.com$/,
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-Info', 'apikey'],
  credentials: true,
  maxAge: 86400
}));

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Health check endpoint îmbunătățit
app.get('/api/health', async (req, res) => {
  const supabaseConnected = await testConnection();
  
  res.json({ 
    status: supabaseConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    connections: {
      supabase: supabaseConnected,
      vps: true
    }
  });
});

// VPS connection status endpoint
app.get('/api/vps/status', (req, res) => {
  res.json({
    status: 'connected',
    timestamp: new Date().toISOString(),
    server: {
      type: 'VPS',
      location: 'France - Paris',
      hostname: 'srv781277.hstgr.cloud'
    }
  });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Enhanced server startup with retries
const startServer = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        console.log(`VPS: srv781277.hstgr.cloud`);
      });
      break;
    } catch (error) {
      if (i === retries - 1) {
        console.error('Failed to start server after', retries, 'attempts');
        process.exit(1);
      }
      console.log(`Attempt ${i + 1} failed, retrying in 5 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

startServer();
