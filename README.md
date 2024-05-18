`git clone https://github.com/fathuurr/synapsis-fe-challenge.git`

## Getting Started

First, after cloning the project you must install using :

````bash
npm install
# or
yarn install

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

1. After the application is running at localhost:3000, add the public API token available on the website GoREST. First, register on the website and then navigate to the login menu. Login using your preferred method, for instance, GitHub. Then, go to the 'Howdy!' menu -> API Tokens. In case your token is expired or unusable, acquire a new one.

2. Edit `.env.local` to this : `NEXT_PUBLIC_API_URL = https://gorest.co.in/public`

3. Once you obtain the token, modify the code located in the "services" folder and within the file user.ts. This file contains endpoints/APIs that require a bearer token for access. Modify the following section in user.ts:

`headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer YOUR_API_TOKEN_HERE",
    },`

You should now be able to access the application at http://localhost:3000.
