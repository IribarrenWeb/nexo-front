import { useEffect, useImperativeHandle } from "react";
import { useForm } from "../../hooks/useForm";
import { userModel } from "../../context/AuthContext";
import Input from "../ui/Input";

const formFields = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        rules: ['required'],
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        rules: ['required'],
    },
    {
        name: 'name',
        label: 'Nombre completo',
        type: 'text',
        rules: ['required'],
    },
    {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        rules: ['required'],
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        rules: ['required'],
    },
    {
        name: 'rePassword',
        label: 'Repetir Contraseña',
        type: 'password',
        rules: ['required'],
    },
]

const RegisterForm = ({ref}) => {
    const { formValues, errors, handleChanges, isValid } = useForm({
        ...userModel
    }, formFields);

    useImperativeHandle(ref, () => ({
        validateForm: () => isValid(),
        getFormValues: () => ({...formValues}),
    }))
    
    return (
        <form action="#" method="POST" className="space-y-6">
            {
                formFields.map(({name, label, type}) => (
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
                                value={formValues[name]}
                                placeholder={label}
                                onChange={handleChanges}
                                errorMessage={errors.find(e => e.field === name)?.message}
                            />
                        </div>
                    </div>
                ))
            }
        </form>
    );
}

export default RegisterForm;