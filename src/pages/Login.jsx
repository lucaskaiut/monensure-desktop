import classNames from "classnames";
import { useState } from "react";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Login () {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleLoginSubmit(event) {
        event.preventDefault();

        const userHasLogged = await login(email, password);

        if (userHasLogged) {
            navigate('/');
        } else {

        }
    }

    return (
        <div className="flex flex-grow">
            <div className="h-[100vh] sm:flex flex-1 bg-green-500 items-center justify-center hidden flex-col">
                <Logo />
                <p className="font-thin text-2xl">Tenha o controle da sua vida financeira</p>
            </div>
            <div className="h-[100vh] flex-[2] flex flex-col justify-center items-center">
                <h1 className="text-zinc-500 text-2xl">
                    Acesse sua conta
                </h1>
                <form 
                    className="flex flex-col justify-center items-center gap-4 w-full mt-4"
                    onSubmit={handleLoginSubmit}    
                >
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 w-4/12 border text-zinc-500", {
                            "border-zinc-300": true,
                            "placeholder-zinc-400": true,
                            "border-danger-500": false,
                            "placeholder-danger-500": false,
                        })}
                        type="email"
                        placeholder="E-Mail"
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 w-4/12 border text-zinc-500", {
                            "border-zinc-300": true,
                            "placeholder-zinc-400": true,
                            "border-danger-500": false,
                            "placeholder-danger-500": false,
                        })}
                        type="password"
                        placeholder="Descrição"
                        onChange={event => setPassword(event.target.value)}
                    />
                    <div className="flex gap-6">
                        <a href="#" className="text-zinc-400 hover:text-zinc-600 transition-colors">Esqueci minha senha</a>
                        <a href="#" className="text-zinc-900 hover:text-black transition-colors">Criar conta</a>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-900 transition-colors rounded-md py-4 px-4 w-4/12"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}