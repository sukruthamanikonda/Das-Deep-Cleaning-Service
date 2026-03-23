# Hygienix Backend

Simple Express + SQLite backend scaffold for the Hygienix demo.

Quick start

1. Open a terminal in `my-app/backend`.
2. Install dependencies:

```powershell
npm install
```

3. Start the server:

```powershell
npm run start
```

By default the server listens on port `5000`. You can set `PORT` and `JWT_SECRET` environment variables.

Available endpoints

- `POST /api/auth/register` {name,email,password}
- `POST /api/auth/login` {email,password}
- `POST /api/contacts` {name,email,phone,message}
- `GET /api/contacts` (admin only)
- `POST /api/orders` (authenticated)
- `GET /api/orders` (admin for all or user for own)
