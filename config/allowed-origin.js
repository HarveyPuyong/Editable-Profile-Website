const defaults = [
  'https://extraordinary-marzipan-c0318c.netlify.app',
  'http://127.0.0.1:5500',
  'http://localhost:4500'
];

// Allow setting a CLIENT_URL (or multiple comma-separated URLs) via env for deployment
const clientEnv = process.env.CLIENT_URL;
const envOrigins = clientEnv
  ? clientEnv.split(',').map((u) => u.trim()).filter(Boolean)
  : [];

// Merge defaults + env values, remove duplicates
const allowedOrigins = Array.from(new Set([...defaults, ...envOrigins]));

module.exports = allowedOrigins;