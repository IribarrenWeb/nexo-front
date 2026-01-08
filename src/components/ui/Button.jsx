import { cn } from "../../utils/helpers"

const Button = ({children, loading, onClick, className}) => {
    return (
        <button
            disabled={loading}
            onClick={onClick}
            className={cn('flex w-full justify-center nx-btn', className)}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}

export default Button;