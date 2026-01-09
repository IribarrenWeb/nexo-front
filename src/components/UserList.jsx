// definimos las columnas de la tabla
// con name el nombre a mostrar y con accessor la propiedad del objeto
const COLUMNS = [
    {
        name: 'ID',
        accessor: 'id',
    },
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
        name: 'Acciones',
    }
]

const UserList = () => {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        {COLUMNS.map((column) => (
                            <th key={column.name} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                {column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
        </>
    );
}

export default UserList;