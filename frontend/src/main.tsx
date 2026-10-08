import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// https://medium.com/@dlrnjstjs/building-a-react-pwa-creating-a-web-app-that-feels-native-57bd21ec03e5
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// Service Worker registration
if ('serviceWorker' in navigator) {
    // Check if browser supports Service Worker
    window.addEventListener('load', () => {
        // Execute after page is fully loaded
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
                // Registration successful
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
                // Registration failed
            });
    });
}