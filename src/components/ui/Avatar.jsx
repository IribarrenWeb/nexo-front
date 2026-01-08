import { User2 } from "lucide-react";
import { cn } from "../../utils/helpers";

const Avatar = ({ src = null, size = 'md', alt = '', className }) => {
    // definimos las clases por tamaño
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    };

    // extraer las iniciales del alt
    const initials = alt
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);

    return (
        <>
            {src ? ( // si tenemos src mostramos la imagen
                <img
                    src={src}
                    alt={alt}
                    className={cn(
                        "rounded-full object-cover",
                        sizeClasses[size],
                        className
                    )}
                />
            ) : (
                <div
                    className={cn( 
                        "rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold",
                        sizeClasses[size],
                        className
                    )}
                > 
                {/* si tenemos iniciales, mostramos iniciales y si no, mostramos icono */}
                    { initials || (
                        <User2 className="text-gray-300" />
                    )}
                </div>
            )}
        </>
    );
}

export default Avatar;