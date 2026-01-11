import { Calendar1 } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useEffect, useMemo, useRef, useState } from "react";
import ModalUserForm from "../components/modals/ModalUserForm";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "../services/auth-service";
import { userService } from "../services/user-service";
import Loader from "../components/ui/Loader";

const Profile = () => {
	const { user, setUser } = useAuth();
	
	const { me } = authService();
	const { showByUsername } = userService();

	const { username } = useParams();
	const [loading, setLoading] = useState(false);
	const [profileUser, setProfileUser] = useState(null);

	const isAuthUser = !username || username === user.username;

	const modalRef = useRef(null);
	const fullName = useMemo(() => `${user.name} ${user.lastName}`, [user]);

	const loadUser = async (reload = false) => {
		try {
			setLoading(true);
			let uData = {...user}; // inicializamos con el usuario del contexto por default
			
			if (isAuthUser && reload) { // si es el usuario autenticado y se indica recargar
				uData = await me(); // refrescamos sus datos
				setUser(uData); // actualizamos el contexto de autenticación
			} else if (username) {
				uData = await showByUsername(username); // cargamos el usuario por username
			}

			setProfileUser(uData); // seteamos el usuario de perfil
		} catch (error) {
			toast.error("Error al cargar el usuario");	
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (!user?._id && !username) return; // si no hay usuario autenticado y no hay username, no hacemos nada

		loadUser(); // cargamos el usuario
	}, [username, user]);

	// si no se encuentra el usuario
	// mostramos un mensaje informativo
	if (!profileUser?._id && !loading) {
		return (
			<div className="flex items-center justify-center h-64 bg-gray-950">
				<span className="text-gray-400 text-2xl">Usuario no encontrado</span>
			</div>
		)
	}

	return (
		<>
			<div className="bg-gray-950">
				{/* banner superior */}
				<div className="bg-[#2853C3] h-40 w-full rounded-tl-lg rounded-tr-lg"></div>

				{/* info de perfil */}
				<div className="flex justify-center">
					<div className="md:flex items-center justify-between min-w-5/6 lg:min-w-4/5">
						<div className="flex justify-start min-w-1/2">
							<div className="relative w-36 lg:w-40 xl:w-48 h-10 pt-4 pb-6 mr-1 lg:mr-2 xl:mr-4">
								<Avatar
									size="xxxl"
									src={profileUser.avatar}
									alt={`${profileUser.name} ${profileUser.lastName}`}
									className="mx-auto absolute -top-16 lg:-top-20 xl:-top-24 border-5 border-gray-950"
								/>
							</div>
							<div>
								<div className="text-2xl lg:text-2xl xl:text-4xl font-bold capitalize mt-4">
									{fullName}
								</div>
								<div className="lg:text-1xl xl:text-2xl text-gray-400 font-light mt-2">
									@{profileUser.username}
								</div>
							</div>
						</div>
						<div className="flex items-center h-full justify-end lg:min-w-1/3">
							<Button className="w-auto" onClick={() => modalRef.current.trigger()}>Editar perfil</Button>
						</div>
					</div>
				</div>

				{/* info fecha de creacion */}
				<div className="max-w-5/6 lg:max-w-4/5 flex items-center mx-auto mt-9 px-4">
					<Calendar1 className="inline-block mr-2 mb-1 text-gray-400" />
					<span className="text-gray-400">
						Se unió en {new Date(profileUser.createdAt).toLocaleDateString()}
					</span>
				</div>

				{/* info bio */}
				<div className="max-w-5/6 lg:max-w-4/5 mx-auto mt-9 px-4">
					<span className="text-gray-400">{profileUser.bio}</span>
				</div>

				{/* info follows */}
				<div className="max-w-5/6 flex items-center lg:max-w-4/5 mx-auto mt-9 px-4">
					<div>
						<span className="font-bold mr-4">{profileUser.followings?.length}</span>
						<span className="text-gray-400">Siguiendo</span>
					</div>
					<div className="ml-6">
						<span className="font-bold mr-4">{profileUser.followers?.length}</span>
						<span className="text-gray-400">Seguidores</span>
					</div>
				</div>
			</div>

			<ModalUserForm ref={modalRef} userData={profileUser} mode='edit' onFinish={() => {}} />

			<Loader show={loading} />
		</>
	);
};

export default Profile;
