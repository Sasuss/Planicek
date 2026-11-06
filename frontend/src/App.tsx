import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";
import Test from "./pages/Test.tsx";
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/"/>
                <Route element={<Dashboard/>} path="/dashboard"/>
                <Route element={<Settings/>} path="/settings"/>
                <Route element={<Test/>} path="/privacy"/>
            </Routes>
        </BrowserRouter>

    )
}

export default App
