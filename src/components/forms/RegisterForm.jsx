import { useImperativeHandle, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import { USER_MODEL } from "../../context/AuthContext";
import Input from "../ui/Input";
import Avatar from "../ui/Avatar";
import { cn } from "../../utils/helpers";
import Select from "../ui/Select";
import Toggle from "../ui/Toggle";

// definicion de los campos del formulario
// showConditions: en que modos se muestra el campo
// rules: reglas de validacion
// mask: funcion para enmascarar el valor antes de setearlo en el estado
const USER_FORM_DEFINITIONS = [
    {
        name: 'avatar',
        label: 'Avatar',
        type: 'text',
        rules: [],
        showConditions: ['admin','edit'],
        disabledConditions: ['admin'],
    },
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        rules: ['required','minLength:4','username'],
        showConditions: ['register', 'admin', 'edit'],
        mask: (value) => value.trim().replace(/\s+/g, '').toLowerCase(),
        disabledConditions: ['admin'],
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        rules: ['required','email'],
        showConditions: ['register', 'admin', 'edit'],
        disabledConditions: ['admin'],
    },
    {
        name: 'name',
        label: 'Nombre completo',
        type: 'text',
        rules: ['required','minLength:3'],
        showConditions: ['register', 'admin', 'edit'],
        disabledConditions: ['admin'],
    },
    {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        rules: ['required'],
        showConditions: ['register', 'admin', 'edit'],
        disabledConditions: ['admin'],
    },
    {
        name: 'rol',
        label: 'Rol',
        type: 'select',
        rules: ['required'],
        showConditions: ['admin'],
    },
    {
        name: 'deactivated',
        label: 'Estado',
        type: 'select',
        rules: ['required'],
        showConditions: ['admin'],
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        rules: ['required','password'],
        showConditions: ['register']
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
const RegisterForm = ({ref, createMode = 'register', userData, children}) => {

    // extraemos los campos validos segun el modo del formulario
    const validFields = useMemo(() => {
        return USER_FORM_DEFINITIONS.filter(field => field.showConditions.includes(createMode))
    }, [createMode]);

    const { formValues, errors, handleChanges, isValid, setAsyncValidations } = useForm(userData ? {...userData, password: null, rePassword: null} : {
        ...USER_MODEL
    }, validFields, true);

    // exponemos metodos al componente padre
    useImperativeHandle(ref, () => ({
        validateForm: () => isValid(),
        getFormValues: () => ({...formValues}),
        setServerErrors: (newErrors) => setAsyncValidations(newErrors),
    }))
    
    // funcion para renderizar el elemento segun su tipo
    const renderElement = ({name, label, type, disabledConditions}) => {
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
            case 'rol':
                return (
                    <Select
                        disabled={disabledConditions?.includes(createMode)}
                        name={name}
                        label={name}
                        value={formValues[name]}
                        onChange={handleChanges}
                        options={[
                            { value: 'user', label: 'Usuario' },
                            { value: 'admin', label: 'Administrador' },
                        ]}
                        errorMessage={errors.find((e) => e.field === name)?.message}
                    />
                )
            case 'deactivated':
                return (
                    <Toggle
                        label={!formValues[name] ? 'Activo' : 'Desactivado'}
                        enabled={formValues[name]}
                        setEnabled={(v) => handleChanges({target: {name, value: v}})}
                    />
                );
            default:
                return (
                    <Input
                        name={name}
                        type={type}
                        disabled={disabledConditions?.includes(createMode)}
                        value={formValues[name]}
                        placeholder={label}
                        onChange={handleChanges}
                        errorMessage={errors.find((e) => e.field === name)?.message}
                    />
                );
        }

    }
    
    return (
        <form onSubmit={(e) => e.preventDefault()} action="#" method="POST" className={cn("space-y-6 register-form", {"profile-mode": ['edit','admin'].includes(createMode)})}>
            {
                validFields.map((data) => (
                    <div key={data.name} className="input-group">
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
            {children}
        </form>
    );
}

export default RegisterForm;