import { useImperativeHandle, useRef, useState } from "react";
import { userService } from "../../services/user-service";
import Modal from "../ui/Modal/Modal";
import ModalTitle from "../ui/Modal/ModalTitle";
import ModalContent from "../ui/Modal/ModalContent";
import RegisterForm from "../forms/RegisterForm";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

const ModalUserForm = ({ ref, userData, mode, onFinish }) => {
    const { update } = userService();
    const modalRef = useRef(null);
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const sendToUpdate = async () => {
        if (!editorRef.current.validateForm()) return; // validamos el formulario
        const data = editorRef.current.getFormValues(); // obtenemos los datos del formulario

        // preparamos los datos a enviar con los campos
        // que nos interesan
        const dataToSend = {
            name: data.name,
            username: data.username,
            email: data.email,
            rol: data.rol,
            deactivated: data.deactivated,
        };

        try {
            setLoading(true); // activamos el loader
            await update(userData._id, dataToSend);
            toast.success("Usuario actualizado con éxito");
            modalRef.current.close(); // cerramos el modal
            onFinish(); // llamamos al callback de finalización
        } catch (error) {
            const err = JSON.parse(error?.message ?? '{}');
            if (err?.errors) editorRef.current.setServerErrors(err.errors); // seteamos los errores en el formulario
        } finally {
            setLoading(false); // desactivamos el loader
        }
    }

    useImperativeHandle(ref, () => ({
        trigger: () => {
            modalRef.current.trigger();
        }
    }))

    return (
        <Modal ref={modalRef} className="w-auto">
            <ModalTitle>Editar usuario</ModalTitle>
            <ModalContent className="relative">
                <RegisterForm
                    ref={editorRef}
                    userData={userData}
                    createMode={mode}
                >
                    <Button className="mt-4" onClick={sendToUpdate}>
                        Guardar cambios
                    </Button>
                </RegisterForm>
                <Loader show={loading} />
            </ModalContent>
        </Modal>
    )
}

export default ModalUserForm