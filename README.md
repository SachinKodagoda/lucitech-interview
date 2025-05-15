# 🚀 React Frontend

## 💻 Requirements

- ✅ Node 18.0.0 or higher (latest LTS version recommended)
- 📦 Package manager: npm / yarn / pnpm (yarn 1.22.22 is used)
- 🧹 Biome for formatting and linting (optional)
- ℹ️ (eslint and prettier not used)

## 📁 Project Structure

```
app
├── components
├── hooks
├── services
├── styles
├── types
├── utils
├── stores
│   ├── slices
│   └── index.tsx
├── routes
│   ├── auth
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── dashboard
│   │   ├── layout.tsx
│   │   ├── product-details.tsx
│   │   └── product-list.tsx
│   ├── not-found.tsx
│   └── private-route.tsx
├── routes.tsx
└── root.tsx
```

## 🔑 Key Features

- 🚀 **Vite** - ES modules, Hot Module Replacement (HMR), efficient bundling, and code splitting
- 🧭 **React Router** - Framework Mode for type-safe routing
- 📦 **TypeScript** - For enhanced developer experience and type safety
- 🎨 **TailwindCSS 4.x** and **Ant Design 5.x** - For modern, responsive UI design

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SachinKodagoda/lucytech-interview.git
cd lucytech-interview
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure environment

Create a `.env` file (use the `.env.template` as a guide):

```bash
cp .env.template .env
```

Example `.env` content:

```
VITE_API_URL=https://go-backend-s2eg.onrender.com
```

### 4️⃣ Backend options

You can either:

- 🌐 Use the provided API URL in the `.env` file (remote backend)
- 🖥️ Run the backend locally from:

  ```bash
  https://github.com/SachinKodagoda/go-backend
  ```

  If running locally, set `VITE_API_URL=http://localhost:8080` in your `.env` file

### 5️⃣ Launch the application

```bash
npm run dev
# or
yarn dev
```

🌐 The application will be available at http://localhost:5173/

## 🚢 Deployment

### 🐳 Docker Deployment

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t duminda-interview .

# Run the container
docker run -p 3000:3000 duminda-interview
```

### 🍀 Vercel Deployment

- This is already deployed on Vercel.

https://lucytech-nine.vercel.app/

## 🔥 User Details

```bash
user: admin@gmail.com
pass: lucytech@123
```

## 👉 Some Screenshots

![login](https://github.com/user-attachments/assets/c2710f10-d8e8-42a6-8988-d2a534940370)

![allproduct](https://github.com/user-attachments/assets/a1feeb5b-e48b-48c9-972d-5719a0810c9b)

![view lastupdate](https://github.com/user-attachments/assets/5bf3e468-37af-4355-8267-7f731e08e22e)

![final edit](https://github.com/user-attachments/assets/7528d92c-2653-4dad-b6b1-652d42fcaf83)

![new-add](https://github.com/user-attachments/assets/d6d9d44c-17f8-468f-9f12-3738dd2b77b2)
