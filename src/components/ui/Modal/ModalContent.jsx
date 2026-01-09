import { cn } from "../../../utils/helpers";

const ModalContent = ({ children, className }) => {
    return (
        <div className={cn('text-gray-800', className)}>
            {children}
        </div>
    );
}

export default ModalContent;