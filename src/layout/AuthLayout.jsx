import { Outlet} from 'react-router-dom'

const AuthLayout = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <Outlet />
        </div>
      </div>
    );
}

export default AuthLayout;
