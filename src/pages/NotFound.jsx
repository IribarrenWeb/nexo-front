import Button from "../components/ui/Button";

const NotFount = () => {
    return (
        <div className="flex bg-gray-950 flex-col items-center justify-center h-screen">
            <img src="/images/nexo-logo.png" alt="Nexo Logo" className="w-32 h-32 mb-8" />
            <h1 className="text-6xl font-bold mb-4 text-gray-200">404</h1>
            <p className="text-2xl text-gray-400">Página no encontrada</p>
            <div>
                <Button to="/" className="mt-8">Volver al inicio</Button>
            </div>
        </div>
    );
}

export default NotFount;