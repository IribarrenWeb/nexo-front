import { useMemo, useState } from "react";
import { useValidator, VALID_RULES } from "./useValidator";

export const useForm = (schema, definitions = [], reactiveValidation = false) => {
    const [formValues, setFormValues] = useState(schema);

    const rules = useMemo(() => {
        const rules = {};
        const keys = Object.keys(schema);
        keys.forEach(key => {
            const rulesField = definitions.find(f => f?.name == key)?.rules ?? [];
            if (Array.isArray(rulesField) && rulesField?.length) {
                rulesField.forEach(rule => {
                    const parseRule = rule.split(':');
                    const ruleParam = parseRule[1] ?? null;
                    rule = parseRule[0];
                    if (VALID_RULES.includes(rule)) {
                        rules[key] = {
                            ...rules[key],
                            [rule]: ruleParam ?? true,
                        }
                    }
                });
            }
        });

        return rules;
    }, [definitions]);
    
    const { errors, validateData, clearErrorKey, clearAllErrors, validateField } = useValidator(formValues, rules);

    const handleChanges = (e) => {
        const { name, value } = e.target;

        setFormValues(pre => ({...pre, [name]: value}))
        if (reactiveValidation) validateField(name, value);
        else clearErrorKey(name);
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