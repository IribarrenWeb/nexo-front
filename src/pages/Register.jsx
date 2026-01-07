import { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { userService } from "../services/user-service";
import { toast } from "sonner";

const Register = () => {
    const [data, setData] = useState({});
    const { store } = userService();

    const resgister = () => {
        toast.promise(
            store(data),
            {
                loading: 'Registrando usuario...',
                success: 'Usuario registrado con éxito',
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
                <RegisterForm setData={setData} />
                <button onClick={resgister} className="mt-9 flex w-96 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    Registrarse
                </button>
            </div>
        </div>
    );
};

export default Register;