# 🚀 React Frontend

## 📋 Requirements

- Node 18.0.0 or higher (latest LTS version used)
- npm / yarn / pnpm (yarn 1.22.22 is used)
- biome is used for formatting and linting (optional)
- (eslint and prettier not used)

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

## Features

- 🚀 Vite for ES modules, Hot Module Replacement (HMR), Bundling, Code Splitting, and more
- ⚡️ React Router (Framework Mode) for Routing
- 📦 TypeScript
- 🎉 TailwindCSS 4.x.x and Ant Design 5.x.x for styling

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/SachinKodagoda/lucitech-interview.git
cd lucitech-interview
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file (use the `.env.template` as a guide):

```bash
cp .env.template .env
```

Following is an example of the `.env` file:

```bash
VITE_API_URL=https://go-backend-s2eg.onrender.com
```

4. You can run the backend locally using

```bash
https://github.com/SachinKodagoda/go-backend
```

or use the provided API URL in the `.env` file.

If you want to run the backend locally, make sure to set the `VITE_API_URL` in your `.env` file to `http://localhost:8080`.

5. Run the application:

```bash
npm run dev
# or
yarn dev
```

The server will start on http://localhost:5173/

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t duminda-interview .

# Run the container
docker run -p 3000:3000 duminda-interview
```
