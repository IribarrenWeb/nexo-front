import { cn } from "../../utils/helpers";

const Link = ({ children, onClick, className }) => {
    return (
        <a
            onClick={onClick}
            href="#"
            className={cn("font-medium text-[#1A4199] hover:text-[#2853c3]", className)}
        >
            {children}
        </a>
    );
}

export default Link;