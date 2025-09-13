# MERN Shopping List - Client

The frontend React application for the MERN Shopping List project.

## Frontend Technologies

- React.js
- Redux for state management
- Bootstrap for styling
- Axios for API requests
- React Transition Group for animations

## Project Structure

```
├── public/           # Static files
└── src/
    ├── actions/     # Redux actions
    ├── components/  # React components
    ├── reducers/    # Redux reducers
    ├── App.js       # Main application component
    └── store.js     # Redux store configuration
```

## Features

- Add shopping list items
- Remove items from the list
- Smooth animations for item transitions
- Responsive design
- Redux state management
- Bootstrap styling

## Components

- `AppNavbar`: Navigation bar component
- `ShoppingList`: Main component for displaying and managing shopping items

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/Aanjaneya24/Shopping_app_client.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will start on port 3000 and open in your default browser.

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Proxy Configuration

The development server is configured to proxy requests to the backend server running on port 5000.
