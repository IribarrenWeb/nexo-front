import { X } from "lucide-react";
import React, { useEffect, useImperativeHandle, useState } from "react";

const Modal = ({ref, onClosed, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // slot pattern para identificar las diferentes secciones del modal
    const title = React.Children.toArray(children).find(child => child.type.displayName === 'ModalTitle');
    const content = React.Children.toArray(children).find(child => child.type.displayName === 'ModalContent');
    const footer = React.Children.toArray(children).find(child => child.type.displayName === 'ModalFooter');

    const trigger = () => {
        setIsOpen(!isOpen);
    }

    // exponemos el trigger para que pueda ser usado desde el componente padre
    useImperativeHandle(ref, () => ({
        trigger
    }));

    useEffect(() => {
        if (!isOpen && onClosed) {
            onClosed(); // evento para cuando se cierra el modal
        }
    }, [isOpen]); // observamos los cambios en isOpen

    return (
        <>
            {
                isOpen ?
                    <div className="nx-modal-backdrop">
                        <div className="nx-modal">
                            <div className="flex justify-between items-center nx-modal-header">
                                {title ? title : <div></div>}
                                <button className="w-auto px-4 py-4 cursor-pointer bg-transparent text-black" onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>
                            <div className="nx-modal-content">
                                {content ? content : null}
                            </div>
                            {footer ? footer : null}
                        </div>
                    </div>
                : null
            }
        </>
    );
}

export default Modal;