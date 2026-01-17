import { Bell } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { notificationService } from "../../services/notification-service"
import { useAuth } from "../../context/AuthContext"
import { cn } from "../../utils/helpers"
import { useNotification } from "../../hooks/useNotification"

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    const { getNotifications, markRead, remove } = notificationService()
    const { user } = useAuth()
    const [show, setShow] = useState(false)
    const audio = new Audio('/noti-sound.wav');

    // notificaciones no leidas computadas
    const unread = useMemo(() => {
        return notifications?.filter(n => !n.read).length
    }, [notifications])

    // funcion para cargar las notificaciones
    const loadNotifications = async () => {
        try {
            setLoading(true)
            const data = await getNotifications()
            setNotifications(data)
        } catch (error) {
            toast.error('Error al cargar las notificaciones')
        } finally {
            setLoading(false)
        }
    }

    // marcar notificaciones como leidas
    const markReadNotifications = async () => {
        try {
            await markRead()
            // actualizamos el estado de las notificaciones localmente para evitar recargar
            setNotifications(prev => prev.map(n => ({...n, read: true})))
        } catch (error) {
            toast.error('Error al marcar las notificaciones como leídas')
        }
    }

    // handler de nuevas notificaciones
    const handleNewNotification = (notification) => {
        // agregamos la nueva notificacion al inicio de la lista
        setNotifications(prev => [notification, ...prev])
        
        audio.play()
    }

    // escuchamos nuevas notificaciones
    useNotification(`notifications-${user?._id ?? null}`, 'new-notification', handleNewNotification)
    
    // cargamos las notificaciones al montar el componente y cuando cambie el usuario
    useEffect(() => {
        loadNotifications()
    }, [user?._id])

    // marcamos las notificaciones como leidas al abrir el panel
    useEffect(() => {
        if (show && unread > 0) markReadNotifications()
    }, [show])

    return (
        <>
            <div className="relative">
                <button onClick={() => setShow(prev => !prev)} className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300 relative cursor-pointer">
                    <Bell className="h-6 w-6" />
                    {unread > 0 && 
                        <span className="absolute top-1.5 right-0 bg-red-600 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                            {unread}
                        </span>
                    }
                </button>
                {
                    show && 
                    <div className="absolute top-9 bg-gray-900 -left-64 border border-gray-950 w-80 rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto z-50">
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-400 mb-2 text-center">Notificaciones</h3>
                            {
                                loading ? (
                                    <p className="text-gray-500">Cargando notificaciones...</p>
                                ) : notifications?.length === 0 ? (
                                    <p className="text-gray-500">No hay notificaciones.</p>
                                ) : (
                                    notifications.map(notification => (
                                            <div key={notification._id} className={cn("p-1 mb-1 rounded-md cursor-pointer", {
                                                'bg-gray-800': !notification.read,
                                            })}>
                                                <h4 className="font-semibold text-gray-200">{notification.title}</h4>
                                                {notification.message && <p className="text-sm text-gray-400">{notification.message}</p>}
                                                <p className="text-xs text-gray-500 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                                            </div>
                                        )
                                    )
                                )
                            }
                        </div>
                    </div>
                }
            </div>
            <div className={cn("absolute top-0 bottom-0 left-0 right-0 z-40", {"hidden": !show})} onClick={() => setShow(false)}>

            </div>
        </>
    )
}

export default Notifications