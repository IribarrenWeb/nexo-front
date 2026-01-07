import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { userModel } from "../../context/AuthContext";
import Input from "../ui/Input";

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
                            <Input 
                                name={name}
                                type={type}
                                required={required}
                                value={formValues[name]}
                                placeholder={label}
                                onChange={handleChanges}
                                onFocus={clearError.bind(this, name)}
                                errorMessage={errorFields.find(e => e.field === name)?.message}
                            />
                        </div>
                    </div>
                ))
            }
        </form>
    );
}

export default RegisterForm;