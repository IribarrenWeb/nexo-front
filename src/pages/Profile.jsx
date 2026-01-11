import { Calendar1 } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useRef } from "react";
import ModalUserForm from "../components/modals/ModalUserForm";

const Profile = () => {
	const { user } = useAuth();
	const modalRef = useRef(null);
	const fullName = `${user.name} ${user.lastName}`;

	return (
		<>
			<div className="bg-gray-950">
				{/* banner */}
				<div className="bg-[#2853C3] h-40 w-full rounded-tl-lg rounded-tr-lg"></div>
				{/* info de perfil */}
				<div className="flex justify-center">
					<div className="md:flex items-center justify-between min-w-5/6 lg:min-w-4/5">
						<div className="flex justify-start min-w-1/2">
							<div className="relative w-36 lg:w-40 xl:w-48 h-10 pt-4 pb-6 mr-1 lg:mr-2 xl:mr-4">
								<Avatar
									size="xxxl"
									src={user.avatar}
									alt={`${user.name} ${user.lastName}`}
									className="mx-auto absolute -top-16 lg:-top-20 xl:-top-24 border-5 border-gray-950"
								/>
							</div>
							<div>
								<div className="text-2xl lg:text-2xl xl:text-4xl font-bold capitalize mt-4">
									{fullName}
								</div>
								<div className="lg:text-1xl xl:text-2xl text-gray-400 font-light mt-2">
									@{user.username}
								</div>
							</div>
						</div>
						<div className="flex items-center h-full justify-end lg:min-w-1/3">
							<Button className="w-auto" onClick={() => modalRef.current.trigger()}>Editar perfil</Button>
						</div>
					</div>
				</div>
				<div className="max-w-5/6 lg:max-w-4/5 flex items-center mx-auto mt-9 px-4">
					<Calendar1 className="inline-block mr-2 mb-1 text-gray-400" />
					<span className="text-gray-400">
						Se unió en {new Date(user.createdAt).toLocaleDateString()}
					</span>
				</div>
				<div className="max-w-5/6 lg:max-w-4/5 mx-auto mt-9 px-4">
					<span className="text-gray-400">{user.bio}</span>
				</div>
				<div className="max-w-5/6 flex items-center lg:max-w-4/5 mx-auto mt-9 px-4">
					<div>
						<span className="font-bold mr-4">{user.followings.length}</span>
						<span className="text-gray-400">Siguiendo</span>
					</div>
					<div className="ml-6">
						<span className="font-bold mr-4">{user.followers.length}</span>
						<span className="text-gray-400">Seguidores</span>
					</div>
				</div>
			</div>

			<ModalUserForm ref={modalRef} userData={user} mode='edit' onFinish={() => {}} />
		</>
	);
};

export default Profile;
