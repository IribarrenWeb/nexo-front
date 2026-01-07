const Link = ({ children, onClick }) => {
    return (
        <a
            onClick={onClick}
            href="#"
            className="font-medium text-indigo-500 hover:text-indigo-400"
        >
            {children}
        </a>
    );
}

export default Link;