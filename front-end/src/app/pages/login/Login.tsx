import { useEffect, useMemo, useState, useCallback, useRef } from "react";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState(""); //TODO: precisamos usar o useState para renderizar o componente em tela
    const [password, setPassword] = useState("");
    const emaillength = useMemo(() => {
        return email.length * 1000;
    }, [email]);

    const handleEnter = useCallback(() => {
        console.log(email);
        console.log(password);
    }, [email, password]);
    // useEffect(() => {
    //     console.log(email);
    // }, [email]);

    // useEffect(() => {
    //     console.log(password);
    // }, [password]);

    return (
        <div>
            <form>
                <label>
                    <p>Quantidade de caracteres email: {emaillength}</p>
                    <span>Email</span>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter"
                                ? inputPasswordRef.current?.focus()
                                : undefined
                        }
                    />
                </label>
                <label>
                    <span>Senha</span>
                    <input
                        ref={inputPasswordRef}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleEnter}>
                    Entrar{" "}
                </button>
            </form>
        </div>
    );
};
