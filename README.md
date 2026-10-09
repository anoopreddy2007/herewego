# The Last Word

An unofficial, fan-built archive of how big football transfer sagas ended. Explore transfer stories, learn how to interpret their stages, and suggest missing sagas.

## Features

- **Archive:** Browse, search, and filter transfer sagas.
- **Method:** Understand the stages of a transfer saga.
- **Suggest:** Submit transfer suggestions with source links.
- **Persistent storage:** Supabase stores submissions and generates reference numbers.
- **Security:** Input validation, honeypot protection, rate limiting, and security headers.
- **Responsive design:** Newspaper-inspired interface for desktop and mobile.

## Tech Stack

- Next.js, React, TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Local Setup

```bash
git clone https://github.com/anoopreddy2007/herewego.git
cd herewego
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deployment

Deployed using Vercel. Configure the required Supabase environment variables in the Vercel project settings.

## Disclaimer

The Last Word is an unofficial fan project. It is not affiliated with, endorsed by, or connected to Fabrizio Romano or any football club. Sources are linked for reference.
