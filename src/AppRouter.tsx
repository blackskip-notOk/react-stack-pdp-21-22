import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import {Login} from "./components/Login/Login";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path='/' element={ <Login /> } /> */}
                <Route path='/' element={ <Layout /> } />
            </Routes>
        </BrowserRouter>

    )
};