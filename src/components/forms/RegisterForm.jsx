import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { userModel } from "../../context/AuthContext";

const formFields = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
    },
    {
        name: 'name',
        label: 'Nombre completo',
        type: 'text',
        required: true,
    },
    {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        required: true,
    },
    {
        name: 'rePassword',
        label: 'Repetir Contraseña',
        type: 'password',
        required: true,
    },
]

const RegisterForm = ({setData, errorFields, clearError}) => {
    const { formValues, handleChanges } = useForm({
        ...userModel
    })

    useEffect(() => {
        setData({...formValues})
    }, [formValues])

    return (
        <form action="#" method="POST" className="space-y-6">
            {
                formFields.map(({name, label, type, required}) => (
                    <div key={name}>
                        <label
                            className="block text-sm/6 font-medium text-gray-500"
                        >
                            {label}
                        </label>
                        <div className="mt-2">
                            <input
                                name={name}
                                type={type}
                                required={required}
                                value={formValues[name]}
                                className={"block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-grey-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" + (errorFields.find(e => e.field === name) ? ' border-2 border-red-500' : '')}
                                placeholder={label}
                                onChange={handleChanges}
                                onFocus={clearError.bind(this, name)}
                            />
                            {
                                errorFields.find(e => e.field === name) ? (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errorFields.find(e => e.field === name).message}
                                    </p>
                                ) : null
                            }
                        </div>
                    </div>
                ))
            }
        </form>
    );
}

export default RegisterForm;