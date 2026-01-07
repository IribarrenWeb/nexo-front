import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { userModel } from "../../context/AuthContext";

const RegisterForm = ({setData}) => {
    const { formValues, handleChanges } = useForm({
        ...userModel
    })

    useEffect(() => {
        setData({...formValues})
    }, [formValues])

    return (
        <form action="#" method="POST" className="space-y-6">
            <div>
                <label
                    className="block text-sm/6 font-medium text-gray-500"
                >
                    Username
                </label>
                <div className="mt-2">
                    <input
                        name="username"
                        required
                        value={formValues.username}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div>
                <label
                    className="block text-sm/6 font-medium text-gray-500"
                >
                    Email
                </label>
                <div className="mt-2">
                    <input
                        name="email"
                        required
                        value={formValues.email}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div>
                <label
                    className="block text-sm/6 font-medium text-gray-500"
                >
                    Nombre completo
                </label>
                <div className="mt-2">
                    <input
                        name="name"
                        required
                        value={formValues.name}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div>
                <label
                    className="block text-sm/6 font-medium text-gray-500"
                >
                    Apellido
                </label>
                <div className="mt-2">
                    <input
                        name="lastName"
                        required
                        value={formValues.lastName}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        onChange={handleChanges}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        className="block text-sm/6 font-medium text-gray-500"
                    >
                        Contraseña
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        name="password"
                        type="password"
                        required
                        value={formValues.password}
                        onChange={handleChanges}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label
                    className="block text-sm/6 font-medium text-gray-500"
                >
                    Repetir Contraseña
                </label>
                <div className="mt-2">
                    <input
                        name="rePassword"
                        type="password"
                        required
                        value={formValues.rePassword}
                        onChange={handleChanges}
                        className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;