import { cn } from "../../utils/helpers";

const Input = ({
    name, 
    type = 'text', 
    required = false, 
    onChange, 
    label, 
    onFocus,
    errorMessage,
    value,
    disabled
}) => {

    const baseClasses = "block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
    return (
        <>
            <input
                name={name}
                type={type}
                required={required}
                value={value}
                disabled={disabled}
                className={cn(baseClasses, {'border-2 border-red-500': errorMessage?.length}, { 'opacity-50 cursor-not-allowed': disabled })}
                placeholder={label}
                onChange={onChange}
                onFocus={onFocus}
            />
            {
                errorMessage?.length ? (
                    <p className="mt-1 text-sm text-red-500">
                        {errorMessage}
                    </p>
                ) : null
            }
        </>
    )
}

export default Input;