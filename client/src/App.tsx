import React from "react";
import './styles/app.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Field from "./components/Field";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="app">
                <Routes>
                    <Route path='/' element={<Navigate to={`/f${(+new Date()).toString(16)}`}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
