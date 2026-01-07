import { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
    
    const isRegister = useMemo(() => {
        return window.location.pathname === '/register'
    }, [window.location.pathname])

    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex">
            <div className={(isRegister ? 'hidden lg:flex' : '') + ' sm:px-6 lg:flex-none lg:px-20 xl:px-24 flex flex-1 flex-col justify-center px-4 py-12 bg-[#111827] text-white'}>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {
                        !isRegister ? <Outlet /> : <div>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                                Crea tu cuenta
                                </h2>
                                <p className="mt-2 text-sm text-gray-300">
                                    ¿Ya tienes una cuenta?{' '}
                                    <a href="#" onClick={redirectToLogin} className="font-medium text-indigo-500 hover:text-indigo-400">
                                        Inicia sesión
                                    </a>
                                </p>
                        </div>
                    }
                </div>
            </div>
            <div className={"relative  w-0 flex-1 " + (!isRegister ? "hidden lg:block" : "")}>
                {
                    isRegister ? <Outlet /> : ''
                }
            </div>
        </div>
    );
}

export default AuthLayout;
