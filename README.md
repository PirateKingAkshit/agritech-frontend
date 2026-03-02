# Agritech Frontend

Frontend application for the Agritech platform, built with Next.js.

## Prerequisites

-   Node.js 18.18+ (Node.js 20 LTS recommended)
-   npm 9+

## Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_BASEURL=http://localhost:5000/api/v1NEXT_PUBLIC_FILEURL=http://localhost:5000/
```

Update these URLs if your backend runs on a different host or port.

## Install Dependencies

```bash
npm install
```

## Run in Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for Production

```bash
npm run build
```

## Run Production Server

```bash
npm run start
```

## Lint

```bash
npm run lint
```