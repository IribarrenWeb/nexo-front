import { useMemo, useState } from "react";
import { useValidator, VALID_RULES } from "./useValidator";

export const useForm = (schema, definitions = [], reactiveValidation = false) => {
    const [formValues, setFormValues] = useState(schema);

    // definicion de las reglas de validacion
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
    
    // hook validador
    const { errors, validateData, clearErrorKey, clearAllErrors, validateField, setErrors } = useValidator(formValues, rules);

    // maneja los cambios de los inputs del formulario
    const handleChanges = (e) => {
        const { name, value } = e.target;
        const mask = definitions.find(def => def.name === name)?.mask;
        
        // si el campo tiene una funcion de mascara, la aplicamos al valor antes de setearlo
        const maskedValue = mask && mask instanceof Function ? mask(value) : value;
        
        setFormValues(pre => ({...pre, [name]: maskedValue}))
        if (reactiveValidation) validateField(name, maskedValue);
        else clearErrorKey(name);
    }

    // resetea los valores del formulario
    const resetForm = (e) => {
        setFormValues(schema);
        clearAllErrors();
    }

    // funcion para setear errorres de validacion que vienen del servidor
    const setAsyncValidations = (newErrors) => {
        if (!Array.isArray(newErrors) || !newErrors.length) return; // si no es un array o esta vacio, no hacemos nada

        // recorremos los errores y los añadimos al estado de errores
        for (let index = 0; index < newErrors.length; index++) {
            const { field, message } = newErrors[index];
            setErrors(prev => {
                const filtered = prev.filter(e => e.field !== field);
                return [...filtered, {field, message}];
            });
        }
    }

    return {
        formValues,
        errors,
        handleChanges,
        setFormValues,
        resetForm,
        isValid: validateData,
        setAsyncValidations
    }
}