import { useRef } from "react";
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
        
        if (!ref.current.validateForm()) return; // validar el formulario antes de enviar

        const data = ref.current.getFormValues(); // obtener los valores del formulario a enviar

        // usamos toast.promise para manejar mensajes y acciones
        // segun el estado de la promesa
        toast.promise(
            store(data), // llamamos al metodo store del userService con los datos del formulario
            {
                loading: 'Registrando usuario...',
                success: () => {
                    navigate('/login');
                    return 'Usuario registrado con éxito';
                },
                error: (err) => {
                    const error = JSON.parse(err?.message ?? '{}'); // parseamos el mensaje de error
                    ref.current.setServerErrors(error.errors); // seteamos los errores en el formulario
                    return 'Error al registrar el usuario';
                }
            }
        )
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="p-8 bg-white rounded-lg shadow-2xl w-lg">
                <img
                    className="w-36 h-auto mx-auto mb-6"
                    src="/images/nexo-io-logo1.png"
                    alt="nexo"
                />
                <RegisterForm ref={ref}/>
                <Button className="mt-6" onClick={register}>
                    Registrarse
                </Button>
            </div>
        </div>
    );
};

export default Register;