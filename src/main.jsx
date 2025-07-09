import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css'; // Your main global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS

// If Vite generated an index.css or App.css, you might want to keep or merge its content
// import './index.css'; // Example if Vite created this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);