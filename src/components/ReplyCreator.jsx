import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { useState } from "react";
import { cn } from "../utils/helpers";
import { commentService } from "../services/comment-service";

// modelo de datos para crear un post
const COMMENT_MODEL = {
    text: '',
    post: null,
}

// definicion de los campos del formulario y sus reglas de validacion
const COMMENT_FORM_DEFINITION = [
    {
        name: 'text',
        rules: ['required','minLength:1','maxLength:280'],
    },
]

const ReplyCreator = ({postId, onReplied, className}) => {
    const { fullName, user } = useAuth();
    const { formValues, errors, handleChanges, resetForm, isValid, setAsyncValidations } = useForm({
      ...COMMENT_MODEL, post: postId,
    }, COMMENT_FORM_DEFINITION);

    const [loading, setLoading] = useState(false);

    const { store } = commentService();

    const toComment = async () => {
        if (!isValid()) return; // validamos el formulario antes de enviar

        try {
            setLoading(true);
            const newComment = await store(formValues);
            toast.success('Comentario creado con éxito');
            if (onReplied) onReplied(newComment); // notificamos al padre que se ha respondido

            resetForm(); // reseteamos el formulario
        } catch (error) {
            const err = JSON.parse(error?.message??'{}')
            if (err?.errors) {
                setAsyncValidations(err.errors);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={cn("flex px-4", className)}>
                <div className="">
                    <Avatar size="md" src={user?.avatar} alt={fullName} />
                </div>
                <div className="w-full ml-4">
                    <Textarea
                        value={formValues?.content}
                        onChange={handleChanges}
                        name="text"
                        placeholder="Escribe una respuesta..."
                        className="border-0 focus:ring-0 focus:outline-none text-gray-200 placeholder-gray-400 bg-gray-950"
                        errorMessage={errors.find(e => e.field === 'text')?.message}
                    />
                    <div className={cn("flex justify-end", {'hidden': formValues?.content?.length === 0})}>
                        <Button outline onClick={toComment} loading={loading} className="w-auto" size="md">Responder</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReplyCreator;