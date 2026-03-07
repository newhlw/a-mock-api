# Portfolio Maker

A clean, simple portfolio maker website that integrates with GitHub and LinkedIn. Built with React (Vite) on the frontend and Node.js/Express on the backend.

## Features

- **GitHub Integration**: Enter a GitHub username to auto-fetch profile info, avatar, stats, and top repositories
- **LinkedIn Section**: Add your LinkedIn profile URL and headline for a professional link card
- **Skills Management**: Add and remove skills with tag-based input
- **Live Preview**: Instantly generate a polished portfolio preview from your form data
- **Responsive Design**: Clean layout that works on desktop and mobile
- **Portfolio API**: REST endpoints to create, read, update, and list portfolios

## Tech Stack

- **Frontend**: React 18, Vite, JSX, CSS
- **Backend**: Node.js, Express
- **APIs**: GitHub REST API (public, no auth required)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Install backend dependencies
npm install

# Build the React frontend
npm run build:client
```

### Running

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Development

For frontend development with hot reload:

```bash
cd client
npm run dev
```

The Vite dev server proxies API requests to the Express backend on port 3000.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/github/user/:username` | Fetch GitHub user profile |
| GET | `/api/github/repos/:username` | Fetch user's top 10 repos |
| POST | `/api/portfolio` | Create a portfolio |
| GET | `/api/portfolio` | List all portfolios |
| GET | `/api/portfolio/:id` | Get a portfolio by ID |
| PUT | `/api/portfolio/:id` | Update a portfolio |

## Project Structure

```
.
├── app.js                     # Express server entry point
├── routes/
│   ├── github.js              # GitHub API proxy routes
│   └── portfolio.js           # Portfolio CRUD routes
├── client/
│   ├── index.html             # HTML entry point
│   ├── vite.config.js         # Vite configuration
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── App.jsx            # Root component with routing
│       ├── index.css           # Global styles
│       └── components/
│           ├── Header.jsx      # Navigation header
│           ├── PortfolioForm.jsx   # Form with GitHub import
│           └── PortfolioPreview.jsx # Generated portfolio view
└── package.json
```
