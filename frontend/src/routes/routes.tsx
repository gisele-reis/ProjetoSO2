import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/Login/SignIn";
import SignUp from "../pages/Login/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import IsLogged from "./IsLogged";
import Home from "../pages/Home";
import CadastroItem from "../pages/CadastroItem";

export function Router() {
    return (
        <Routes>
            <Route element={<IsLogged />}>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro" element={<CadastroItem />} />
            </Route>

        </Routes>
    )
}