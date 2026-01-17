import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { notificationService } from "../../services/notification-service"
import { useAuth } from "../../context/AuthContext"
import { cn } from "../../utils/helpers"

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    const { getNotifications, markRead, remove } = notificationService()
    const { user } = useAuth()
    const [show, setShow] = useState(false)

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

    useEffect(() => {
        loadNotifications()
    }, [user?._id])

    return (
        <>
            <div className="relative">
                <button onClick={() => setShow(prev => !prev)} className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                    <Bell className="h-6 w-6" />
                </button>
                {
                    show && 
                    <div className="absolute top-9 bg-gray-900 -left-64 border border-gray-950 w-80 rounded-md shadow-lg overflow-hidden z-50">
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-gray-400 mb-2 text-center">Notificaciones</h3>
                            {loading ? (
                                <p className="text-gray-500">Cargando notificaciones...</p>
                            ) : notifications?.length === 0 ? (
                                <p className="text-gray-500">No hay notificaciones.</p>
                            ) : (<></>)
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