import classNames from "classnames";
import { useState } from "react";
import { Logo } from "../components/Logo";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { validateData } from "../formValidation";
import toast from "react-hot-toast";

export function Register () {
    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [phone, setPhone] = useState('');

    const [formErrors, setFormErrors] = useState([]);

    const { register } = useAuth();

    const navigate = useNavigate();

    const formValidation = {
        firstname: [
            'required'
        ],
        lastname: [
            'required',
        ],
        email: [
            'required',
        ],
        password: [
            'required',
            'confirmed'
        ],
        password_confirmation: [
            'required',
        ],
        phone: [
            'required'
        ],
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();

        const registerData = {
            firstname,
            lastname,
            email,
            password,
            password_confirmation: passwordConfirmation,
            phone,
            group_name: Math.floor(Date.now() / 1000).toString()
        }

        const { errors, hasError } = validateData(registerData, formValidation);

        setFormErrors(errors);

        if (!hasError) {
            try {
                await register(registerData);

                navigate('/login');

                toast.success('Usuário criado com sucesso!');

            } catch ({ response }) {
                toast.error(response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-grow">
            <div className="h-[100vh] sm:flex flex-1 bg-green-500 items-center justify-center hidden flex-col">
                <Logo />
                <p className="font-thin text-2xl">Tenha o controle da sua vida financeira</p>
            </div>
            <div className="h-[100vh] flex-[2] flex flex-col justify-center items-center px-3">
                <h1 className="text-zinc-500 text-2xl">
                    Criar conta
                </h1>
                <form 
                    className="flex flex-col justify-center items-center gap-4 w-full mt-4"
                    onSubmit={handleLoginSubmit}    
                >
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['firstname'],
                            "placeholder-zinc-400": !formErrors['firstname'],
                            "border-danger-500": formErrors['firstname'],
                            "placeholder-danger-500": formErrors['firstname'],
                        })}
                        type="text"
                        placeholder="Nome"
                        value={firstname}
                        onChange={event => setFirstname(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['lastname'],
                            "placeholder-zinc-400": !formErrors['lastname'],
                            "border-danger-500": formErrors['lastname'],
                            "placeholder-danger-500": formErrors['lastname'],
                        })}
                        type="text"
                        placeholder="Sobrenome"
                        value={lastname}
                        onChange={event => setLastname(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['email'],
                            "placeholder-zinc-400": !formErrors['email'],
                            "border-danger-500": formErrors['email'],
                            "placeholder-danger-500": formErrors['email'],
                        })}
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['password'],
                            "placeholder-zinc-400": !formErrors['password'],
                            "border-danger-500": formErrors['password'],
                            "placeholder-danger-500": formErrors['password'],
                        })}
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['passwordConfirmation'],
                            "placeholder-zinc-400": !formErrors['passwordConfirmation'],
                            "border-danger-500": formErrors['passwordConfirmation'],
                            "placeholder-danger-500": formErrors['passwordConfirmation'],
                        })}
                        type="password"
                        placeholder="Confirmação de Senha"
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                    />
                    <input
                        className={classNames("bg-ice rounded-md py-4 px-4 sm:w-4/12 w-full border text-zinc-500", {
                            "border-zinc-300": !formErrors['phone'],
                            "placeholder-zinc-400": !formErrors['phone'],
                            "border-danger-500": formErrors['phone'],
                            "placeholder-danger-500": formErrors['phone'],
                        })}
                        type="text"
                        placeholder="Telefone"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                    <div className="flex gap-6">
                        <Link to="/login" className="text-zinc-900 hover:text-black transition-colors">Voltar para o login</Link>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-900 transition-colors rounded-md py-4 px-4 sm:w-4/12 w-full"
                        type="submit"
                    >
                        Criar conta
                    </button>
                </form>
            </div>
        </div>
    );
}