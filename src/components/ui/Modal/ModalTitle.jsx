const ModalTitle = ({ children, className }) => {
    return (
        <h3 className={cn('nx-modal-title', className)}>
            {children}
        </h3>
    );
}

export default ModalTitle;