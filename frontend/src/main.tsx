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
