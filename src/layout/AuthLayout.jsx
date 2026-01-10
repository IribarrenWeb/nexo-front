import { useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import Link from '../components/ui/Link';
import { cn } from '../utils/helpers';

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
            <div className={(isRegister ? 'hidden lg:flex' : '') + ' sm:px-6 lg:flex-none lg:px-20 xl:px-24 flex flex-1 flex-col justify-center px-4 py-12 bg-[#1A4199] text-white'}>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {
                        !isRegister ? <Outlet /> : <div>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                                Crea tu cuenta
                                </h2>
                                <p className="mt-2 text-sm text-gray-300">
                                    ¿Ya tienes una cuenta?{' '}
                                    <Link className="text-amber-300 hover:text-amber-200" onClick={redirectToLogin}>
                                        Inicia sesión
                                    </Link>
                                </p>
                        </div>
                    }
                </div>
            </div>
            <div className={cn("relative  w-0 flex-1 bg-blue-50", {"hidden lg:block": !isRegister})}>
                {
                    isRegister ? <Outlet /> : (
                        <div className='flex items-center justify-center h-full'>
                            <div className='nexo-login-bg-container'>
                                <img
                                    className='w-3/4 h-auto'
                                    src="/images/nexo-io-logo1.png"
                                    alt="nexo"
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default AuthLayout;
