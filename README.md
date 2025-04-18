The Freedom Post
================

This is a basic content management system for an imaginary publication called The Freedom Post.

The project is built on Next.js, using React, Tailwind, Typescript etc.

## Project structure

```
data/
   └── data.json            # The data file containing all content items etc.
public/                     # Public assets, e.g. the site logo
src/
   ├── app/                 # Next.js app directory
   │   ├── components/      # Reusable components
   │   ├── content/         # Content management pages
   │   └── model/           # TypeScript types and constants
   ├── server/              # Server-side functions
   └── middleware.ts        # Authentication middleware
```

## About this app

This application consists of 2 components:
* A json api to store and retrieve data (content items and authors), using [json-server](https://www.npmjs.com/package/json-server)
* A fullstack Next.js application, including both frontend and backend (Server Side Rendering (SSR))

You could think of the json api as just a database, rather than an api (it could easily be replaced by a database). It has no authentication logic and no other feature than to serve the data to the Next.js app.

## Configuration

To run this project, you must have Node.js installed.
Next.js 15 requires Node.js version 18.18.0. I use version 22.

https://nodejs.org/en/download

The application needs to be configured using environment variables. Create a file in the project root called `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWN0aXZlLXBlbmd1aW4tOS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=[the key i sent you]

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/content
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/content
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/content
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/content
```

The variable called CLERK_SECRET_KEY contains a secret, and you should of course never push secrets to git!

I have included the secret in the email I sent you. Grab it from there and paste it in your `.env.local`.

> Alternatively, you could create your own account on [Clerk](https://clerk.com/) and use the keys for that account instead of using mine.

Starting the application
------------------------

> The following commands are run from the root folder of this project.

Install the required dependencies (first time only):

```bash
npm install
```

Start the api:

```bash
npx json-server data/db.json --port 3001
```

Then, start the frontend in dev mode:

```bash
npm run dev
```

Point your web browser to `http://localhost:3000`.

Click the [Sign up](http://localhost:3000/sign-up) button to add an account using Google or Microsoft.

Instead of creating a mock auth, I decided to try out Clerk, which provides very simple but powerful authentication using third party auth providers like Google, Microsoft etc. Clerk also makes sure to protect the server side components from unauthenticated access using its middleware in `src/middleware.ts`.

You should be able to log in using either your Google or Microsoft account.

> I have not been able to try the Microsoft authentication myself, but I thought I'd add it for you in case you are using Office365.

> Please note that the json api is completely unprotected and open! This is just meant to be a database replacement given the time constraints of this assignment and it does not need to be exposed to the internet if this application would be deployed to a server/cloud.

Usage
-----

The application does not come with pre-configured users. You can create a new user by signing up with your Google or Microsoft account.

By default, new users have the Contributor role. If you want to become an editor, you need to add an Author with the same email address as your user:

1. Open the file `data/db.json`
1. Add an author:
```
 {
    "id": "123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "editor"
}
```

Make sure you _change the email address_ to the address of your user. Reload the page and you should be promoted to editor!

The relationship between author and user is not necessarily 1:1. You could have a user and log in without having a corresponding Author. Then you will always be a Contributor. You need an Author with the correct email address to become an Editor (but you can of course be a Contributor with an Author as well).


Comments
--------

For some reason, Prettier keeps modifying my `'use server'` and `'use client'` statements by adding a parenthesis around them, which caused a syntax error. That is why I prefix these statements with `// prettier-ignore`. There is likely a more elegant solution for this.

Limitations
-----------

* Application only supports one content type - Article
* Input validation is minimal
* Error handling is not prioritized
* No translations - Interface is English only
* Only works on localhost for now - not production ready ;)
* No paging - do not use this system with thousands of items :)
* No tests, sorry :(

Future improvements
-------------------

In order to improve this app, the above limitations can be addressed.

Here are some additional things that I would improve given more time:

* Extract status dropdown to it's own component
* Extract item row to it's own component
* Make it easier to handle the status of an article by replacing the Status dropdown with contextual buttons like Publish/Withdraw/Archive/Send for review etc.
* Author administration page
* Add loading spinner

