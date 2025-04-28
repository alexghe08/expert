
export default {
  apps: [{
    name: 'referat-app',
    script: 'server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      NODE_VERSION: '20.x',
      PORT: process.env.PORT || 3000,
      SSH_PORT: 2222,
      SUPABASE_URL: 'https://whrpnqvnujhzqljjmxum.supabase.co',
      SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocnBucXZudWpoenFsampteHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzQyNjMsImV4cCI6MjA2MTExMDI2M30.DKZ5yPiR9RKOzSP65-Ba5ZYX-sLqJ9cXnsolb_Vntl8',
      VITE_SUPABASE_URL: 'https://whrpnqvnujhzqljjmxum.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocnBucXZudWpoenFsampteHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzQyNjMsImV4cCI6MjA2MTExMDI2M30.DKZ5yPiR9RKOzSP65-Ba5ZYX-sLqJ9cXnsolb_Vntl8'
    },
    env_production: {
      NODE_ENV: 'production',
      NODE_VERSION: '20.x'
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    max_restarts: 10,
    restart_delay: 4000,
    min_uptime: 5000,
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    instance_var: 'INSTANCE_ID',
    log_type: 'json'
  }]
};
