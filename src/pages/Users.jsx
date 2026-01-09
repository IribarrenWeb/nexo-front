import { Plus } from "lucide-react";
import Button from "../components/ui/Button";
import UserList from "../components/UserList";
import { useRef } from "react";
import Modal from "../components/ui/Modal/Modal";
import ModalTitle from "../components/ui/Modal/ModalTitle";
import ModalContent from "../components/ui/Modal/ModalContent";
import RegisterForm from "../components/forms/RegisterForm";
import { useAuth } from "../context/AuthContext";

const Users = () => {
    const modalRef = useRef(null);
    const { role } = useAuth();

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-semibold text-white">Gestion de Usuarios</h1>
                <div>
                    <Button className="mt-0" onClick={() => modalRef.current.trigger()}>
                        <div className="flex items-center">
                            <Plus className="mr-2 h-4 w-4"/>
                            Agregar usuario
                        </div>
                    </Button>
                </div>
            </div>
            <div>
                <UserList />
            </div>

            <Modal ref={modalRef}>
                <ModalTitle>Crear nuevo usuario</ModalTitle>
                <ModalContent>
                    <RegisterForm createMode={role == 'admin' ? 'admin' : 'edit'} />
                </ModalContent>
            </Modal>
        </>
    )
}

export default Users;