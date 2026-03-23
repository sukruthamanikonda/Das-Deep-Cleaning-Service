Deployment checklist for Hygienix (frontend + backend)

Overview
- Frontend: React app located at project root `src/` and `build/` for production build.
- Backend: Express server using SQLite at `backend/server.js` (port 5000 by default).

Prerequisites
- Node.js (16+) and npm installed on the server.
- A production domain + TLS certificate (recommended: use Let's Encrypt via nginx).
- Environment variables set (see `.env` example in `backend/.env.example`).

Backend environment variables (important)
- `SMTP_HOST` - SMTP server host (e.g. smtp.gmail.com)
- `SMTP_PORT` - SMTP port (587 or 465)
- `SMTP_USER` - SMTP username (email)
- `SMTP_PASS` - SMTP password or app-specific password
- `OWNER_EMAIL` - Email address to receive contact/order notifications
- `JWT_SECRET` - Strong random secret string (do NOT use the default)

Install dependencies (backend)

```powershell
cd "c:\Users\sukru\Downloads\HYGIENIX DEEP CLEANING\New folder\my-app\backend"
npm install --production
```

Start backend (production)

```powershell
# set env vars in the environment or via a process manager
$env:JWT_SECRET = 'your-secure-random-string'
# Ex: use PM2 or a similar process manager
pm install -g pm2
pm run start
# or
pm run dev (for development with nodemon)
```

Frontend build & serve

```powershell
cd "c:\Users\sukru\Downloads\HYGIENIX DEEP CLEANING\New folder\my-app"
npm install
npm run build
# Serve the contents of the `build/` directory using nginx, static file server, or Node static server.
```

Recommended nginx proxy (sketch)

```
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        root /var/www/hygienix/build;
        try_files $uri $uri/ /index.html;
    }
}
```

Security checklist before going live
- Set a strong `JWT_SECRET` and never commit it to the repo.
- Use HTTPS for all traffic.
- Set `OWNER_EMAIL` and SMTP credentials in the environment.
- Restrict `CORS` origins to your domain in `backend/server.js` (adjust `cors()` options).
- Add monitoring and periodic backups for the SQLite DB file.

Operational notes
- The app uses a local SQLite DB located at `backend/hygienix.db`. For production consider migrating to a managed DB (Postgres, MySQL) if you expect high traffic or concurrent writes.
- Back up the `hygienix.db` file regularly (cron job or scheduled task).

If you want, I can also generate an `nginx` config tailored to your domain and create a `pm2` start script.
