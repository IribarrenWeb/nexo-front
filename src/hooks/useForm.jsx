import { useState } from "react";
import useValidator from "./useValidator";

export const useForm = (values, rules = {}) => {
    const [formValues, setFormValues] = useState(values);
    const { errors, validateData, clearErrorKey, clearAllErrors } = useValidator(formValues, rules);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormValues(pre => ({...pre, [name]: value}))
        clearErrorKey(name);
    }

    const resetForm = (e) => {
        setFormValues(values);
        clearAllErrors();
    }

    return {
        formValues,
        errors,
        handleChanges,
        setFormValues,
        resetForm,
        isValid: validateData,
    }
}