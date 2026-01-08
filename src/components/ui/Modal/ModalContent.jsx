const ModalContent = ({ children, className }) => {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}

export default ModalContent;