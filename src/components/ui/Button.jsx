import { Loader2 } from "lucide-react";
import { cn } from "../../utils/helpers"
import { useNavigate } from "react-router-dom";

const Button = ({children, loading, onClick, className, size, outline, to, disabled}) => {
    const sizes = {
        sm: 'nx-btn-sm',
        md: 'nx-btn-md',
        lg: 'nx-btn-lg',
    };
    const navigate = useNavigate();

    let baseClasses = "flex w-full justify-center nx-btn";
    
    if (outline) baseClasses += " nx-btn-outline";

    if (disabled) baseClasses += " nx-btn-disabled";
    
    const handleClick = (e) => {
        if (loading || disabled) return;
        if (to) navigate(to);
        if (onClick) onClick(e);
    }

    return (
        <button
            disabled={loading || disabled}
            onClick={handleClick}
            className={cn(baseClasses, sizes[size] ?? '', className)}
        >
            {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : children}
        </button>
    );
}

export default Button;