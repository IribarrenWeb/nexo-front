import { cn } from "../../../utils/helpers";

const ModalFooter = ({ children, className }) => {
    return (
        <div className={cn('nx-modal-footer', className)}>
            {children}
        </div>
    );
}

export default ModalFooter;