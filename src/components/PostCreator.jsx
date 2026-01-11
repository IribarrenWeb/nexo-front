import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { useState } from "react";
import { postService } from "../services/post-service";

// modelo de datos para crear un post
const POST_MODEL = {
    content: '',
    image: null,
}

// definicion de los campos del formulario y sus reglas de validacion
const POST_FORM_DEFINITION = [
    {
        name: 'content',
        rules: ['required','minLength:5','maxLength:280'],
    },
]

const PostCreator = ({onPosted}) => {
    const { fullName } = useAuth();
    const { formValues, errors, handleChanges, resetForm, isValid, setAsyncValidations } = useForm({
      ...POST_MODEL,
    }, POST_FORM_DEFINITION);

    const [loading, setLoading] = useState(false);

    const { store } = postService();

    const toPost = async () => {
        if (!isValid()) return; // validamos el formulario antes de enviar

        try {
            setLoading(true);
            const newPost = await store(formValues);
            toast.success('Post creado con éxito');
            if (onPosted) onPosted(newPost); // notificamos al padre que se ha creado un post

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
            <div className="flex px-5">
                <div className="">
                    <Avatar size="lg" alt={fullName} />
                </div>
                <div className="w-full ml-4">
                    <Textarea
                        value={formValues?.content}
                        onChange={handleChanges}
                        name="content"
                        label={`¿Qué estás pensando, ${fullName}?`}
                        placeholder="Comparte tus nexos..."
                        errorMessage={errors.find(e => e.field === 'content')?.message}
                    />
                    <div className="flex justify-end">
                        <Button outline onClick={toPost} loading={loading} className="w-auto" size="md">Públicar</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCreator;