
import Modal from "../ui/Modal/Modal";
import ModalTitle from "../ui/Modal/ModalTitle";
import ModalContent from "../ui/Modal/ModalContent";
import PostElement from "../PostElement";
import ReplyCreator from "../ReplyCreator";
import { useImperativeHandle, useRef } from "react";

const ModalPostComment = ({ ref, postDta, onFinish }) => {
    const modalRef = useRef(null);

    useImperativeHandle(ref, () => ({
        trigger: () => modalRef.current.trigger()
    }))

    const handleReplied = (newComment) => {
        if (onFinish) onFinish(newComment); // notificamos al padre que se ha respondido
        modalRef.current.close(); // cerramos el modal
    }

    return (
        <Modal ref={modalRef} className="w-5/6 md:w-3/4 lg:w-2/4 bg-gray-900">
            <ModalTitle></ModalTitle>
            <ModalContent className="relative">
                <PostElement className="nx-posts reply"  postData={postDta} editable={false} />
                <ReplyCreator postId={postDta._id} onReplied={handleReplied} />
            </ModalContent>
        </Modal>
    )
}

export default ModalPostComment