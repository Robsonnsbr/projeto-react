import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario?: string;
    logout?: () => void;
}
interface IUsuarioLogadoProviderProps {
    children: React.ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>(
    {}
);
export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({
    children,
}) => {
    const [name, setName] = useState("");
    useEffect(() => {
        setTimeout(() => {
            setName("Robson");
        }, 1000);
    }, []);

    const handleLogout = useCallback(() => {
        console.log("Logout!!!");
    }, []);

    return (
        <UsuarioLogadoContext.Provider
            value={{ nomeDoUsuario: name, logout: handleLogout }}
        >
            {children}
        </UsuarioLogadoContext.Provider>
    );
};
