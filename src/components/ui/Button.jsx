import { cn } from "../../utils/helpers"

const Button = ({children, loading, onClick, className}) => {
    return (
        <button
            disabled={loading}
            onClick={onClick}
            className={cn('flex w-full justify-center rounded-md nx-accent-bg px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500', className)}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}

export default Button;