const Button = ({children, loading, onClick}) => {
    return (
        <button
            disabled={loading}
            onClick={onClick}
            className="mt-9 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}

export default Button;