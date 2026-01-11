import UserList from "../components/UserList";
import { useRef, useState } from "react";
import ModalUserForm from "../components/modals/ModalUserForm";

const Users = () => {
    const modalRef = useRef(null);
    const listRef = useRef(null);
    const [userToEdit, setUserToEdit] = useState(null);

    const toSelectUser = (user) => {
        setUserToEdit(user); // seteamos el usuario a editar
        modalRef.current.trigger(); // abrimos el modal
    }

    
    return (
        <div className="p-6">
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
            <ModalUserForm ref={modalRef} userData={userToEdit} mode='admin' onFinish={() => listRef.current.refresh()} />
        </div>
    )
}

export default Users;