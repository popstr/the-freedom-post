Freedom Post
------------

This is a basic content management system for a site called The Freedom Post.

The project is built on Next.js, using React, Tailwind, Typescript etc.

## Getting Started

To run this project, you must have Node installed.

https://nodejs.org/en/download

THe application consists of a frontend and a backend component.

First, start the backend:

```bash
npx json-server data/db.json --port 3001
```

The, start the frontend in dev mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

and then point your web browser to `http://localhost:3000`.

You should be able to log in using either your Google or Microsoft account.

