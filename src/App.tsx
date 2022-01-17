import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { Layout } from "./components/Layout/Layout";
import {Login} from "./components/Login/Login";

export const App = () => {

    return (
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' element={ <Login /> } /> */}
            <Route path='/' element={ <Layout /> } />
        </Routes>
    </BrowserRouter>

    )
};