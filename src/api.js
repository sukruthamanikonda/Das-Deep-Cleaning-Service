export const API_BASE = (process.env.NODE_ENV === 'production')
    ? 'https://das-deep-cleaning-service.onrender.com/backend'
    : 'http://localhost:5001';
