import { useMemo, useState, useCallback, useRef } from "react";

import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/InputLogin";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emaillength = useMemo(() => {
        return email.length * 1000;
    }, [email]);

    const handleEnter = useCallback(() => {
        console.log(email);
        console.log(password);
    }, [email, password]);

    return (
        <div>
            <form>
                <p>Quantidade de caracteres email: {emaillength}</p>
                <InputLogin
                    label="Email"
                    value={email}
                    onChange={(newValue) => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />
                <InputLogin
                    type="password"
                    label="Password"
                    value={password}
                    ref={inputPasswordRef}
                    onChange={(newValue) => setPassword(newValue)}
                />
                <ButtonLogin type="button" onClick={handleEnter}>
                    Entrar
                </ButtonLogin>
                <ButtonLogin type="button" onClick={handleEnter}>
                    Cadastrar-se
                </ButtonLogin>
            </form>
        </div>
    );
};
