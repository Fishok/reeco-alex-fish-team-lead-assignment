# 🧑‍💼 Users Management App (React + TypeScript)

A modern single-page application for managing users, built with:

- ⚛️ **React** + **TypeScript**
- 🎯 **RTK Query** for data fetching
- 🎨 **Tailwind CSS** for styling
- 📊 **React Table (TanStack)** for rendering data tables
- 🔌 **MirageJS** for mocking API endpoints
- ✅ **React Testing Library** for unit and integration tests
- 🧩 Custom UI Components: Toggle, Modal, Icons, etc...

---

## 🚀 Features

- View a table of users (name, email, status)
- Toggle user active/inactive with real-time status updates
- Edit user details via modal
- Create new users
- Confirm user deletion with modal
- In-memory mock API using MirageJS


---

## 🧪 Mock API (MirageJS)

All endpoints are intercepted by MirageJS (client-side) during development:

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/api/users`     | Fetch all users      |
| POST   | `/api/users`     | Create new user      |
| PUT    | `/api/users/:id` | Update existing user |
| DELETE | `/api/users/:id` | Delete user          |

You can find this in `src/mocks/server.ts`.

---

## ⚙️ Getting Started

### ✅ Requirements

- **Node.js** ≥ 20.12.0
- **Yarn** ≥ 1.22.19  
  _(or use `npm` if preferred)_

---

### 📦 Install dependencies

```bash
yarn install
# or
npm install
```

### ▶️ Start development server

```bash
yarn dev
# or
npm run dev
```

### ✅ Run tests

```bash
yarn test
# or
npm run test
```
