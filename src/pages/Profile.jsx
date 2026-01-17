import { Calendar1, Send } from "lucide-react";
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
import PostList from "../components/PostsList";

const Profile = () => {
	const { user, setUser } = useAuth();
	
	const { me } = authService();
	const { showByUsername, toFollow } = userService();

	const { username } = useParams();
	const [loading, setLoading] = useState(true);
	const [loadingFollow, setLoadingFollow] = useState(false);
	const [profileUser, setProfileUser] = useState(null);

	// computada para saber si el perfil es del usuario autenticado
	const isAuthUser = useMemo(() => !username || username === user.username, [username, user]);
	
	// computada para saber si el usuario autenticado sigue al usuario del perfil
	const isAuthUserFollow = useMemo(() => {
		if (isAuthUser) return false;
		return profileUser?.followers?.includes(user._id);
	}, [profileUser, user]);

	const modalRef = useRef(null);
	const fullName = useMemo(() => `${profileUser?.name} ${profileUser?.lastName}`, [profileUser]);

	// funcion para cargar el usuario del perfil a mostrar
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

			// retornamos ya que si es null
			// el error es por abortController y no hay que tomarlo en cuenta
			if (uData === null) return;

			setProfileUser(uData); // seteamos el usuario de perfil

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	// funcion para seguir/dejar de seguir al usuario
	const triggerFollow = async () => {
		try {
			setLoadingFollow(true);
			const updatedUser = await toFollow(profileUser._id);
			setProfileUser(usr => ({...usr, ...updatedUser.model})); // actualizamos el usuario de perfil
			setUser(usr => ({...usr, ...updatedUser.user})); // actualizamos el usuario autenticado
			console.log(updatedUser, user, profileUser);
		} catch (error) {
			toast.error("Error al actualizar el seguimiento");
		} finally {
			setLoadingFollow(false);
		}
	}

	useEffect(() => {
		if (!user?._id && !username) return; // si no hay usuario autenticado y no hay username, no hacemos nada
		loadUser(); // cargamos el usuario
	}, [username, user._id]);

	// si no se encuentra el usuario
	// mostramos un mensaje informativo
	if (!profileUser?._id && !loading) {
		return (
			<div className="flex items-center justify-center h-64 bg-gray-950">
				<span className="text-gray-400 text-2xl">Usuario no encontrado</span>
			</div>
		)
	} else if (!profileUser?._id && loading) { // estado de carga
		return <Loader show={true} />
	}

	return (
		<>
			<div className="bg-gray-950">
				{/* banner superior */}
				<div className="bg-[#2853C3] h-40 w-full rounded-tl-lg rounded-tr-lg"></div>

				{/* info de perfil */}
				<div className="flex justify-center">
					<div className="flex items-center justify-between min-w-5/6 lg:min-w-4/5">
						<div className="lg:flex justify-start min-w-1/2">
							<div className="relative w-30 lg:w-36 xl:w-40 h-10 pt-4 pb-6 mr-1 lg:mr-2 xl:mr-4">
								<Avatar
									size="xxxl"
									src={profileUser?.avatar}
									alt={`${profileUser.name} ${profileUser.lastName}`}
									className="mx-auto absolute -top-10 lg:-top-16 xl:-top-20 border-5 border-gray-950"
								/>
							</div>
							<div className="mt-14 lg:mt-0">
								<div className="text-2xl lg:text-3xl xl:text-4xl font-bold capitalize mt-4">
									{fullName}
								</div>
								<div className="lg:text-1xl xl:text-2xl text-gray-400 font-light mt-2">
									@{profileUser.username}
								</div>
							</div>
						</div>
						<div className="flex items-start pt-3 lg:pt-0 lg:items-center h-full justify-end lg:min-w-1/6 ml-4">
							{
								isAuthUser ? (
									<Button className="w-auto" onClick={() => modalRef.current.trigger()}>Editar perfil</Button>
								) : (
									<>
										<Button size="sm" loading={loadingFollow} outline={isAuthUserFollow} className="w-auto" onClick={triggerFollow}>
											{isAuthUserFollow ? 'Dejar de seguir' : 'Seguir'}
										</Button>
										<Button size="sm" outline={true} className="w-auto ml-4" to={`/messages/${profileUser.username}`}>
											<Send className="inline-block" />
										</Button>
									</>
								)
							}
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
				<div className="border-t-2 border-gray-800 mt-10 mb-0 pt-10">
					<PostList userId={profileUser._id} />
				</div>
			</div>

			<ModalUserForm ref={modalRef} userData={profileUser} mode='edit' onFinish={() => {}} />

			<Loader show={loading} />
		</>
	);
};

export default Profile;
