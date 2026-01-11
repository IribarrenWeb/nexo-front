import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers"

const Button = ({children, loading, onClick, className, size, outline}) => {
    const sizes = {
        sm: 'nx-btn-sm',
        md: 'nx-btn-md',
        lg: 'nx-btn-lg',
    };

    let baseClasses = "flex w-full justify-center nx-btn";
    
    if (outline) baseClasses += " nx-btn-outline";

    return (
        <button
            disabled={loading}
            onClick={onClick}
            className={cn(baseClasses, sizes[size] ?? '', className)}
        >
            {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : children}
        </button>
    );
}

export default Button;