import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const userLogin = {
    username: '',
    password: ''
}

const LoginForm = ({setData, errorFields, clearError}) => {
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
                        className={ (errorFields.some(e=>e.field == 'username') ? "border-2 border-red-500" : '') + " block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"}
                        onChange={handleChanges}
                        onFocus={clearError.bind(this, 'username')}
                    />
                    {
                        errorFields.some(e => e.field === 'username') ? (
                            <p className="mt-1 text-sm text-red-500">
                                {errorFields.find(e => e.field === 'username').message}
                            </p>
                        ) : null
                    }
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
                        onFocus={clearError.bind(this, 'password')}
                        className={((errorFields.some(e=>e.field == 'password') ? 'border-2 border-red-500 ' : '')) + "block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"}
                    />
                    {
                        errorFields.some(e => e.field === 'password') ? (
                            <p className="mt-1 text-sm text-red-500">
                                {errorFields.find(e => e.field === 'password').message}
                            </p>
                        ) : null
                    }
                </div>
            </div>
        </form>
    );
}

export default LoginForm;