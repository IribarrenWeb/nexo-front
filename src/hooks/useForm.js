import { useState } from "react";

export const useForm = (values) => {
    const [formValues, setFormValues] = useState(values);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormValues(pre => ({...pre, [name]: value}))
    }

    const resetForm = (e) => setFormValues(values)

    return {
        formValues,
        handleChanges,
        setFormValues,
        resetForm
    }
}