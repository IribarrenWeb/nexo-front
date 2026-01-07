import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { userService } from "../services/user-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({});
    const { store } = userService();
    const navigate = useNavigate();
    
    const [errorFields, setErrorFields] = useState([]);

    const clearErrorKey = (key) => {
        setErrorFields(prev => prev.filter(e => e.field !== key));
    }

    const validateData = () => {
        const { password, rePassword } = data;

        const requiredFields = ['email', 'username', 'name', 'lastName'];
        const errorFieldsTemp = [];

        if (password !== rePassword) {
            errorFieldsTemp.push({field: 'rePassword', message: 'Las contraseñas no coinciden'});
        }
        if (password.length < 6) {
            errorFieldsTemp.push({field: 'password', message: 'La contraseña debe tener al menos 6 caracteres'});
        }

        requiredFields.forEach(field => {
            if (!data[field]?.length) {
                errorFieldsTemp.push({field, message: 'Este campo es obligatorio'});
            }
        });

        setErrorFields(errorFieldsTemp);

        return errorFieldsTemp.length === 0;
    }

    const resgister = () => {
        if (!validateData()) return;

        toast.promise(
            store(data),
            {
                loading: 'Registrando usuario...',
                success: () => {
                    navigate('/login');
                    return 'Usuario registrado con éxito';
                },
                error: 'Error al registrar el usuario'
            }
        )
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">
                    Registro de Usuario
                </h1>
                <RegisterForm setData={setData} errorFields={errorFields} clearError={clearErrorKey}  />
                <button onClick={resgister} className="mt-9 flex w-96 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Register;