import { useImperativeHandle, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { userModel } from "../../context/AuthContext";
import Input from "../ui/Input";
import Avatar from "../ui/Avatar";

// definicion de los campos del formulario
// showConditions: en que modos se muestra el campo
// rules: reglas de validacion
// mask: funcion para enmascarar el valor antes de setearlo en el estado
const formFields = [
    {
        name: 'avatar',
        label: 'Avatar (URL)',
        type: 'text',
        rules: [],
        showConditions: ['admin','edit'],
    },
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        rules: ['required','minLength:4','username'],
        showConditions: ['register', 'admin'],
        mask: (value) => value.trim().replace(/\s+/g, '').toLowerCase(),
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        rules: ['required','email'],
        showConditions: ['register', 'admin']
    },
    {
        name: 'name',
        label: 'Nombre completo',
        type: 'text',
        rules: ['required','minLength:3'],
        showConditions: ['register', 'admin']
    },
    {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        rules: ['required'],
        showConditions: ['register', 'admin']
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        rules: ['required','password'],
        showConditions: ['register', 'admin']
    },
    {
        name: 'rePassword',
        label: 'Repetir Contraseña',
        type: 'password',
        rules: ['required','match:password'],
        showConditions: ['register']
    },
]

// por defecto el modo es 'register', puede ser 'admin' o 'edit'
const RegisterForm = ({ref, createMode = 'register'}) => {

    // extraemos los campos validos segun el modo del formulario
    const validFields = useMemo(() => {
        return formFields.filter(field => field.showConditions.includes(createMode))
    }, [createMode]);

    const { formValues, errors, handleChanges, isValid, setAsyncValidations } = useForm({
        ...userModel
    }, validFields, true);

    // exponemos metodos al componente padre
    useImperativeHandle(ref, () => ({
        validateForm: () => isValid(),
        getFormValues: () => ({...formValues}),
        setServerErrors: (newErrors) => setAsyncValidations(newErrors),
    }))
    
    // funcion para renderizar el elemento segun su tipo
    const renderElement = ({name, label, type}) => {
        switch(name) {
            case 'avatar':
                return (
                    <>
                        <Avatar
                            src={formValues['avatar']}
                            size="lg"
                            alt={`${formValues['name']} ${formValues['lastName']}`}
                            className="mb-4 hover:bg-blue-900 transition-all duration-200 cursor-pointer"
                        />
                    </>
                );
            default:
                return (
                    <Input
                        name={name}
                        type={type}
                        value={formValues[name]}
                        placeholder={label}
                        onChange={handleChanges}
                        errorMessage={errors.find((e) => e.field === name)?.message}
                    />
                );
        }

    }
    
    return (
        <form action="#" method="POST" className="space-y-6 register-form">
            {
                validFields.map((data) => (
                    <div key={data.name}>
                        <label
                            className="block text-sm/6 font-medium text-gray-500"
                        >
                            {data.label}
                        </label>
                        <div className="mt-2">
                            {/* renderizamos dinamicamente el elemento */}
                            {renderElement(data)}
                        </div>
                    </div>
                ))
            }
        </form>
    );
}

export default RegisterForm;