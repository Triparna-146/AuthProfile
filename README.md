# AuthProfile 🛡️

A full-stack authentication and user profile management system built with **Next.js**, **NestJS**, **GraphQL**, and **MongoDB**. Users can register, log in, view their profile, and update personal details — all while maintaining secure, cookie-based authentication.

---

## ✨ Features

- ✅ User Signup & Login
- 🔐 Cookie-based Authentication
- 📄 Profile View & Edit
- ⚙️ Form Validation with Yup
- 📡 Apollo Client + Server for GraphQL
- 🗄️ MongoDB for Persistent Storage
- 🧠 NestJS Backend (MVC structure)
- ⚛️ Next.js Frontend with App Router

---

## 🛠️ Tech Stack

| Frontend     | Backend   | Database | GraphQL                | Auth              |
|--------------|-----------|----------|------------------------|-------------------|
| Next.js 14   | NestJS    | MongoDB  | Apollo Client & Server | HTTP-only Cookies |

---

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Triparna-146/AuthProfile.git
cd AuthProfile
```

### 2. Set up environment variables

Create `.env` files in both `/client` and `/server` directories:

#### 📁 client/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
```

#### 📁 server/.env

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=nodedevelopment
```

### 3. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 4. Start development servers

```bash
# Start backend
cd server
npm run start:dev

# Start frontend
cd ../client
npm run dev
```

---

## 🔒 Authentication Flow

1. **Signup / Login** → sends credentials to backend
2. **Backend** sets a secure, HTTP-only cookie
3. **Frontend** uses `ApolloClient` to query authenticated routes like `/me`
4. **Logout** clears cookie + Apollo cache

---

---

## 🤝 Contributing

PRs are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © [Triparna-146](https://github.com/Triparna-146)
