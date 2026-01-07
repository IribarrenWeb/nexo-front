import { useState } from "react";

const useValidator = (data, rules) => {

    const [errors, setErrors] = useState([]);

    const validateField = useCallback((field, value) => {
        let error = '';
        const rule = rules[field];

        if (rule.required && value?.toString().trim() === '') {
            error = 'Este campo es obligatorio';
        }

        return error;
    }, [rules]);

    const validateData = () => {

        const errorFieldsTemp = [];

        const keys = Object.keys(rules);

        for (let key of keys) {
            const value = data[key];
            const error = validateField(key, value);

            if (error.length) {
                errorFieldsTemp.push({field: key, message: error});
            }
        }

        setErrors(errorFieldsTemp);

        return errorFieldsTemp.length === 0;
    }

    const clearErrorKey = (key) => {
        setErrors(prev => prev.filter(e => e.field !== key));
    }

    const clearAllErrors = () => {
        setErrors([]);
    }

    return {
        errors,
        clearErrorKey,
        clearAllErrors,
        validateData,
    }
}

export default useValidator;