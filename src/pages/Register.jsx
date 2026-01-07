import { useRef, useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { userService } from "../services/user-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Register = () => {
    const ref = useRef();
    const { store } = userService();
    const navigate = useNavigate();
    
    const register = () => {
        if (!ref.current.validateForm()) return;
        const data = ref.current.getFormValues();
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
                <RegisterForm ref={ref}/>
                <Button onClick={register}>
                    Registrarse
                </Button>
            </div>
        </div>
    );
};

export default Register;