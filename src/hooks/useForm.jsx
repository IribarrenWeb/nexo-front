import { useMemo, useState } from "react";
import { useValidator, VALID_RULES } from "./useValidator";

export const useForm = (schema, definitions = []) => {
    const [formValues, setFormValues] = useState(schema);

    const rules = useMemo(() => {
        const rules = {};
        const keys = Object.keys(schema);
        keys.forEach(key => {
            const rulesField = definitions.find(f => f?.name == key)?.rules ?? [];
            if (Array.isArray(rulesField) && rulesField?.length) {
                rulesField.forEach(rule => {
                    if (VALID_RULES.includes(rule)) {
                        rules[key] = {
                            ...rules[key],
                            [rule]: true,
                        }
                    }
                });
            }
        });

        return rules;
    }, [definitions]);
    
    const { errors, validateData, clearErrorKey, clearAllErrors } = useValidator(formValues, rules);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormValues(pre => ({...pre, [name]: value}))
        clearErrorKey(name);
    }

    const resetForm = (e) => {
        setFormValues(schema);
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