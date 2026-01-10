import Button from "../components/ui/Button";
import UserList from "../components/UserList";
import { useRef, useState } from "react";
import Modal from "../components/ui/Modal/Modal";
import ModalTitle from "../components/ui/Modal/ModalTitle";
import ModalContent from "../components/ui/Modal/ModalContent";
import RegisterForm from "../components/forms/RegisterForm";
import { userService } from "../services/user-service";
import Loader from "../components/ui/Loader";
import { toast } from "sonner";

const Users = () => {
    const modalRef = useRef(null);
    const editorRef = useRef(null);
    const listRef = useRef(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(false);

    const { update } = userService();

    const toSelectUser = (user) => {
        setUserToEdit(user); // seteamos el usuario a editar
        modalRef.current.trigger(); // abrimos el modal
    }

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
            await update(userToEdit._id, dataToSend);
            toast.success('Usuario actualizado con éxito');
            modalRef.current.close(); // cerramos el modal
            listRef.current.refresh(); // refrescamos la lista de usuarios
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // desactivamos el loader
        }
    }
    
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-semibold text-white">Gestion de Usuarios</h1>
                <div>
                    {/* <Button className="mt-0" onClick={() => modalRef.current.trigger()}>
                        <div className="flex items-center">
                            <Plus className="mr-2 h-4 w-4"/>
                            Agregar usuario
                        </div>
                    </Button> */}
                </div>
            </div>
            <div>
                <UserList ref={listRef} onSelect={toSelectUser} />
            </div>

            <Modal ref={modalRef} className="w-auto">
                <ModalTitle>Editar usuario</ModalTitle>
                <ModalContent className="relative">
                    <RegisterForm ref={editorRef} userData={userToEdit} createMode='admin'>
                        <Button className="mt-4" onClick={sendToUpdate}>
                            Guardar cambios
                        </Button>
                    </RegisterForm>
                    <Loader show={loading} />
                </ModalContent>
            </Modal>
        </>
    )
}

export default Users;