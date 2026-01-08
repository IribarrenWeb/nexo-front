import { useRef, useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { authService } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();
    const ref = useRef();

    const { login } = authService();
    
    const navigate = useNavigate();

    const toLogin = () => {
        if (!ref.current.validateData()) return;
        
        setLoading(true);
        
        const data = ref.current.getFormValues();

        const loginPromise = login(data);
        
        toast.promise(
            loginPromise,
            {
                loading: 'Iniciando sesión...',
                success: () => {
                    navigate('/');
                    return 'Sesión iniciada con éxito';
                },
                error: 'Error al iniciar sesión'
            }
        )

        loginPromise.then((user) => {
            setUser((u) => ({...u, ...user}))
        }).finally(() => setLoading(false));
    }

    const redirectToRegister = () => {
        navigate("/register");
    }

    return (
      <div className="flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h1 className="mb-4 text-2xl font-bold text-center text-indigo-500">
            Login
          </h1>

          <LoginForm ref={ref} />

          <Button className="mt-6" loading={loading} onClick={toLogin}>
            Entrar
          </Button>

          <div className="mt-4 text-sm text-center text-gray-500">
            ¿No tienes una cuenta?{' '}
            <Link onClick={redirectToRegister}>
                Registrarse
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Login;
