import { useImperativeHandle } from "react";
import { useForm } from "../../hooks/useForm";
import Input from "../ui/Input";

const userLogin = {
    username: '',
    password: ''
}

const loginDefinitions = [
    {
        name: 'username',
        type: 'text',
        label: 'Username',
        rules: ['required'],
    },
    {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        rules: ['required'],
    }
]

const LoginForm = ({ ref }) => {
    const { formValues, errors, handleChanges, isValid } = useForm({
        ...userLogin
    }, loginDefinitions)

    useImperativeHandle(ref, () => ({
        validateData: () => isValid(),
        getFormValues: () => ({ ...formValues }),
    }))

    return (
        <form action="#" method="POST" className="space-y-6">
            {
                loginDefinitions.map(({name, label, type}) => (
                    <div>
                        <label
                            className="block text-sm/6 font-medium text-gray-500"
                        >
                            {label}
                        </label>
                        <div className="mt-2">

                            <Input
                                placeholder={label}
                                name={name}
                                type={type}
                                value={formValues[name]}
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

export default LoginForm;