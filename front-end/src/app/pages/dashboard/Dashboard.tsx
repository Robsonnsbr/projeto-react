import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UsuarioLogadoContext } from "../../shared/contexts";

export const Dashboard = () => {
    const counterRef = useRef(0);
    const contador = counterRef.current;
    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);
    return (
        <div style={{ color: "red" }}>
            <p>Dashboard</p>
            <p>{nomeDoUsuario}</p>
            <p>Contator: {contador}</p>
            <button
                onClick={() => {
                    return (
                        counterRef.current++, console.log(counterRef.current)
                    );
                }}
            >
                Somar
            </button>
            <Link to={"/entrar"}>Login</Link>
        </div>
    );
};
