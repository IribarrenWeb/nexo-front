import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "../../services/user-service";
import { toast } from "sonner";
import Avatar from "../ui/Avatar";
import { useNavigate } from "react-router-dom";

const SearchUser = () => {
    const [query, setQuery] = useState('');
    const [users, serUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toSearch } = userService();
    const navigate = useNavigate();

    // funcion para buscar usuarios
    const handleSearch = async (e) => {
        if (query.trim().length === 0) { // si la consulta esta vacia, no buscamos
            serUsers([]); // limpiamos los usuarios
            return; // salimos
        }

        try {
            setLoading(true);
            
            const data = await toSearch(query);

            serUsers(data);
        } catch (error) {
            toast.error('Error al buscar usuarios');   
        } finally {
            setLoading(false);
        }
    }

    const toProfile = (username) => {
        navigate(`/${username}`);
        setQuery(''); // limpiamos la consulta
    }

    useEffect(() => {
        handleSearch(); // buscamos usuarios cuando cambia el valor del query
    }, [query]);

    return (
        <div className="relative flex flex-1">
            <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm outline-0"
                placeholder="Buscar..."
            />
            {loading && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
                </div>
            )}
            {users?.length > 0 && query?.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-900 border border-gray-800 mt-6 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {users.map((user) => (
                        <div onClick={() => toProfile(user.username)} key={user._id} className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
                            <Avatar className="mr-2" src={user?.avatar} alt={(`${user.name} ${user.lastName}`).trim()} size="sm"  />
                            <span className="text-white">
                                {user.name} {user.lastName} 
                                <span className="text-gray-400 ml-3">
                                    @{user.username}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchUser;