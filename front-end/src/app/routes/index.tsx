import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { Routes as Switch } from "react-router-dom";

// import { Dashboard, Login } from "../pages";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/entrar" element={<h1>Olá</h1>} />
                <Route path="/pagina-inicial" element={<h1>Olá</h1>} />

                <Route path="/" element={<Navigate to="pagina-inicial" />} />
            </Switch>
        </BrowserRouter>
    );
};
