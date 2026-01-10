// definimos las columnas de la tabla

import { toast } from "sonner";
import { userService } from "../services/user-service";
import Loader from "./ui/Loader";
import { useEffect, useImperativeHandle, useState } from "react";
import Badge from "./ui/Badge";
import Link from "./ui/Link";

// con name el nombre a mostrar y con accessor la propiedad del objeto
const COLUMNS = [
    {
        name: 'Nombre',
        accessor: 'name',
    },
    {
        name: 'Usuario',
        accessor: 'username',
    },
    {
        name: 'Email',
        accessor: 'email',
    },
    {
        name: 'Rol',
        accessor: 'rol',
    },
    {
        name: 'Estado',
        accessor: 'deactivated',
    },
    {
        name: 'Creado el',
        accessor: 'createdAt',
    },
    {
        name: 'Editar',
        accessor: 'edit',
    }
]

const UserList = ({onSelect, ref}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { index } = userService();
    
    // funcion para obtener los usuarios
    const getUsers = async () => {
        try {
            setLoading(true); // seteamos el loading
            const response = await index();
            setUsers(response ?? []); // seteamos usuarios
        } catch (error) {
            toast.error('Error al cargar los usuarios'); // mostramos error
        } finally {
            setLoading(false); // quitamos el loading
        }
    }

    // funcion para mostrar el contenido de cada celda segun la columna
    const toShowRow = (data, column) => {
        const value = data[column.accessor];

        switch (column.accessor) {
            case 'deactivated':
                const status = value ? "Desactivado" : "Activo";
                return <Badge color={status === "Activo" ? "green" : "red"}>{status}</Badge>;
            case 'edit':
                return <Link onClick={() => onSelect(data)}>{column.name}</Link>;
            case 'rol':
                return <Badge className="capitalize" color={value === 'admin' ? 'purple' : 'blue'}>{value}</Badge>;
            case 'createdAt': // formateamos la fecha
                const date = new Date(value);
                return date.toLocaleDateString();
            default:
                return value;
        }
    }

    useImperativeHandle(ref, () => ({
        refresh: getUsers, // exponemos la funcion para refrescar la lista
    }));

    useEffect(() => {
        getUsers(); // obtenems los usuarios al montar el componente
    }, []);

    return (
        <div className="relative overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="min-w-full">
                    <tr>
                        {COLUMNS.map((column) => (
                            <th key={column.name} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    { 
                        !users?.length ? (
                            <tr>
                                <td colSpan={COLUMNS.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    No hay usuarios disponibles.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => ( // recorremos usuarios
                                <tr key={user._id}>
                                    {COLUMNS.map((column) => (
                                        <td key={column.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {toShowRow(user, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
            <Loader show={loading} /> {/* mostramos loader si loading es true */}
        </div>
    );
}

export default UserList;