import { Loader2Icon, User2 } from "lucide-react";
import { cn } from "../../utils/helpers";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/user-service";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Avatar = ({ src = null, size = 'md', alt = '', className, enableUpdate = false }) => {
    const { user, setUser, reloadAvatar, setReloadAvatar } = useAuth();
    const userId = user?._id;
    const [loading, setLoading] = useState(false);
    const { update } = userService();
    const [avatarError, setAvatarError] = useState(false);

    // definimos las clases por tamaño
    // se le especifica un min y max para evitar que se deforme
    // ya que con un h-x no siempre se respeta el aspect ratio
    const sizeClasses = {
        sm: 'min-w-8 max-w-8 min-h-8 max-h-8',
        md: 'min-w-12 max-w-12 min-h-12 max-h-12',
        lg: 'min-w-16 max-w-16 min-h-16 max-h-16',
        xl: 'min-w-24 max-w-24 min-h-24 max-h-24',
        xxl: 'min-w-32 max-w-32 min-h-32 max-h-32',
        xxxl: 'min-w-30 max-w-30 min-h-30 max-h-30  lg:w-36 lg:h-36 xl:w-40 xl:h-40',
    };

    // definimos las clases de texto por tamaño
    const textClasses = {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
        xl: 'text-xl',
        xxl: 'text-2xl',
        xxxl: 'text-4xl',
    };

    // extraer las iniciales del alt
    const initials = alt
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);

    /**
     * funcion para actualizar el avatar del usuario
     * - lee el archivo seleccionado y lo convierte a base64
     * - envia la imagen al backend para actualizar el avatar
     * - actualiza el estado del usuario con el nuevo avatar
     * - se fuerza la recarga del avatar con un estado temporal y un timeout 
     * @param {*} e 
     * @returns 
     */
    const toUpdateAvatar = async (e) => {
        console.log('update avatar', e.target.files);
        const file = e.target.files[0];
        
        if (!file) {
            toast.error('No se seleccionó ningún archivo');
            return
        }
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64String = event.target.result;
            
            // enviar la imagen al backend para actualizar el avatar
            try {
                setLoading(true);
                const res = await update(userId, { avatar: base64String });
                setUser(usr => ({ ...usr, avatar: res.avatar }));
                
                // forzamos recarga del avatar
                setReloadAvatar(true)

                // usamos un timeout para quitar el reload despues de un tiempo
                setTimeout(() => {
                    setReloadAvatar(false);
                }, 500);

            } catch (error) {
                toast.error('Error al actualizar el avatar');
            } finally {
                setLoading(false);
            }
        }

        reader.readAsDataURL(file);
    }
                
    
    /**
     * funcion para manejar el click en el avatar
     * - si enableUpdate es true y userId existe, crea un input file dinamicamente
     * - al seleccionar un archivo, llama a la funcion toUpdateAvatar
     */
    const handleClick = () => {
        if (!enableUpdate || !userId) return;
        // crear un input file dinamicamente
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png, image/jpeg, image/jpg';
        input.onchange = toUpdateAvatar;
        input.click();
    }

    // si reloadAvatar es true, mostramos un loader para forzar recarga
    // ya que el src en teoria es el mismo pero la imagen en fisica cambio
    // por ende react no detecta el cambio
    if (reloadAvatar) {
        return (<Loader2Icon className="animate-spin"/>); // forzamos recarga del avatar
    }
    
    return (
        <span className={cn('relative', {'opacity-50 pointer-events-none': loading})}>
            {loading && (
                <Loader2Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-gray-500" />
            )}
            {src && !avatarError ? ( // si tenemos src mostramos la imagen
                <img
                    onClick={handleClick}
                    src={src}
                    alt={alt}
                    onError={() => setAvatarError(true)}
                    className={cn(
                        "rounded-full object-cover",
                        {"cursor-pointer hover:opacity-80 transition-opacity": enableUpdate && userId},
                        sizeClasses[size],
                        className
                    )}
                />
            ) : (
                <div
                    onClick={handleClick}
                    className={cn( 
                        "rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold",
                        {"cursor-pointer hover:opacity-80 transition-opacity": enableUpdate && userId},
                        sizeClasses[size],
                        className,
                        textClasses[size]
                    )}
                > 
                {/* si tenemos iniciales, mostramos iniciales y si no, mostramos icono */}
                    { initials || (
                        <User2 className="text-gray-300" />
                    )}
                </div>
            )}
        </span>
    );
}

export default Avatar;