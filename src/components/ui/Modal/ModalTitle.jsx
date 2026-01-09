import { cn } from "../../../utils/helpers";

const ModalTitle = ({ children, className }) => {
    return (
        <h3 className={cn('nx-modal-title text-gray-700', className)}>
            {children}
        </h3>
    );
}

export default ModalTitle;