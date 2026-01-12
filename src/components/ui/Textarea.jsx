import { cn } from "../../utils/helpers";

const Textarea = ({ label, value, onChange, name, placeholder, className, errorMessage, containerClass }) => {
    const baseClasses = "w-full resize-none p-3 rounded-lg bg-transparent text-white border-1 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClasses = errorMessage ? "border-red-500 focus:ring-red-500" : "";
    const finalClasses = cn(baseClasses, errorClasses, className);

    return (
        <div className={cn("mb-4", containerClass)}>
            {label && <label className="block text-white font-semibold mb-2">{label}</label>}
            <textarea
                className={finalClasses}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                rows={4}
            />
            {
                errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            }
        </div>
    );
}

export default Textarea;