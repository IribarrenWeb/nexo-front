import { cn } from "../../utils/helpers";

const Select = ({ label, options, value, onChange, errorMessage, disabled }) => {
    const baseClasses = "block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
    
    return (
        <>
            <select
                name={label}
                value={value}
                disabled={disabled}
                className={cn(baseClasses, {'border-2 border-red-500': errorMessage?.length,}, { 'opacity-50 cursor-not-allowed': disabled })}
                onChange={onChange}
            >
                <option value="">{`Seleccione ${label}`}</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value} selected={option.value === value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
            {
                errorMessage?.length ? (
                    <p className="mt-1 text-sm text-red-500">
                        {errorMessage}
                    </p>
                ) : null
            }
        </>
    );
}

export default Select;