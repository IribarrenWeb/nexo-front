import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const userLogin = {
    username: '',
    password: ''
}

const LoginForm = ({setData}) => {
    const { formValues, handleChanges } = useForm({
        ...userLogin
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
        </form>
    );
}

export default LoginForm;