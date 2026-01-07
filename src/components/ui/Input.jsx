const Input = ({
    name, 
    type = 'text', 
    required = false, 
    onChange, 
    label, 
    onFocus,
    errorMessage,
    value
}) => {
    return (
        <>
            <input
                name={name}
                type={type}
                required={required}
                value={value}
                className={"block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-grey-700 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" + (errorMessage?.length ? ' border-2 border-red-500' : '')}
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