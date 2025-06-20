# 📚 Online Bookstore Frontend

Frontend for an online bookstore, built with:

- React 19 + Vite
- Redux Toolkit
- React Router DOM
- JWT Authentication with protected routes
- Axios (with interceptors and token management)
- Feature-based architecture (DDD-style)
- Vitest + Testing Library for unit tests

---

## 🛠️ Requirements

- Node.js >= 18
- npm or yarn

---

## 🚀 Getting Started

### Install dependencies

```
npm install
```

### Run the app

```
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

Run unit and integration tests with:

```
npx vitest run
```

## 👤 Features

- ✅ Login with email & password
- ✅ Register a new user
- ✅ Logout and clear token
- ✅ Token persisted in localStorage
- ✅ Redirect if token is missing/expired
- ✅ Add books to cart (UI only)
- ✅ Error messages on failed auth
- ✅ Styled with plain CSS (no framework)

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── features/
│   │   ├── auth/        ← Login, Register, Auth slice
│   │   └── catalog/     ← Books page, BookItem component
│   └── shared/
│       ├── api/         ← Axios instance with interceptors
│       └── router/      ← ProtectedLayout, RedirectIfAuthenticated
└── state/               ← Global Redux store
```

---

## 📄 License

MIT
