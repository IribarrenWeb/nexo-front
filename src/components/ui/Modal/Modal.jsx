import { X } from "lucide-react";
import React, { useEffect, useImperativeHandle, useState } from "react";
import ModalContent from "./ModalContent";
import ModalTitle from "./ModalTitle";
import ModalFooter from "./ModalFooter";
import { cn } from "../../../utils/helpers";

const Modal = ({ref, onClosed, children, className}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // slot pattern para identificar las diferentes secciones del modal
    const title = React.Children.toArray(children).find(child => child.type === ModalTitle);
    const content = React.Children.toArray(children).find(child => child.type === ModalContent);
    const footer = React.Children.toArray(children).find(child => child.type === ModalFooter);

    const trigger = () => {
        setIsOpen(!isOpen);
    }

    // exponemos el trigger para que pueda ser usado desde el componente padre
    useImperativeHandle(ref, () => ({
        trigger,
        close: () => setIsOpen(false),
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
                        <div className={cn("nx-modal bg-gray-100", className)}>
                            <div className="flex justify-between items-center nx-modal-header">
                                {title ? title : <div></div>}
                                <button className="w-auto px-4 py-4 cursor-pointer bg-transparent text-black" onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>
                            <div className="nx-modal-content">
                                {content}
                            </div>
                            {footer}
                        </div>
                    </div>
                : null
            }
        </>
    );
}

export default Modal;