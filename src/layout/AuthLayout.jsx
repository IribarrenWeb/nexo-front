import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">
            <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#111827] text-white'>
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <Outlet />
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
            </div>
        </div>
    );
}

export default AuthLayout;
