import { cn } from "../../utils/helpers";

const Badge = ({ children, color = 'blue', className }) => {

    // colores disponibles para el badge, en caso de no recibir un color valido, se usara azul por defecto
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800',
        red: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        gray: 'bg-gray-100 text-gray-800',
        purple: 'bg-purple-100 text-purple-800',
    };
    
    // clases base del badge
    const baseClasses = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`;

    return (
        <span className={cn(baseClasses, colorClasses[color] || colorClasses.blue, className)}>
            {children}
        </span>
    );
};

export default Badge;