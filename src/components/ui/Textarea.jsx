import { cn } from "../../utils/helpers";

const Textarea = ({ rows = 4, label, value, onChange, name, placeholder, className, errorMessage, containerClass, onEnter }) => {
    const baseClasses = "w-full resize-none p-3 rounded-lg bg-transparent text-white border-1 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClasses = errorMessage ? "border-red-500 focus:ring-red-500" : "";
    const finalClasses = cn(baseClasses, errorClasses, className);
    
    const keyPress = (e) => {
        if (e.key === 'Enter' && onEnter) {
            e.preventDefault();
            onEnter(e);
        }
    };

    return (
        <div className={cn("mb-4", containerClass)}>
            {label && <label className="block text-white font-semibold mb-2">{label}</label>}
            <textarea
                className={finalClasses}
                value={value}
                name={name}
                onChange={onChange}
                onKeyDown={keyPress}
                placeholder={placeholder}
                rows={rows}
            />
            {
                errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            }
        </div>
    );
}

export default Textarea;