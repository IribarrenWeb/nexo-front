import { useCallback, useState } from "react";

const VALID_RULES = ['required','email','password','match','minLength','username'];

const useValidator = (data, rules) => {

    const [errors, setErrors] = useState([]);

    const checkRules = useCallback((field, value) => {
        const rule = rules[field];
        
        if (!rule) return '';

        if (rule.required && value?.toString().trim() === '') {
            return 'Este campo es obligatorio';
        }

        if (!value || value.toString().trim() === '') return '';

        if (rule.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Por favor, ingrese un correo electrónico válido';
            }
        }

        if (rule.password) {
            if (value.length < 6) {
                return 'La contraseña debe tener al menos 6 caracteres';
            }
            if (!/[A-Z]/.test(value)) {
                return 'La contraseña debe contener al menos una letra mayúscula';
            }
        }

        if (rule.match) {
            const compareField = rule.match;
            console.log('Comparando', value, 'con', data[compareField], 'campo', compareField);
            if (value !== data[compareField]) {
                return `El campo debe ser idéntico a ${compareField}`;
            }
        }

        if (rule.minLength) {
            if (value.length < parseInt(rule.minLength)) {
                return `El campo debe tener al menos ${rule.minLength} caracteres`;
            }
        }

        if (rule.username) {
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(value)) {
                return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
            }
        }

        return '';
    }, [rules, data]);

    const validateField = (key, value) => {
        const error = checkRules(key, value);
        if (error.length) {
            setErrors(prev => {
                const filtered = prev.filter(e => e.field !== key);
                return [...filtered, {field: key, message: error}];
            });
            return false;
        } else {
            setErrors(prev => prev.filter(e => e.field !== key));
            return true;
        }
    }

    const validateData = () => {

        const errorFieldsTemp = [];

        const keys = Object.keys(rules);

        for (let key of keys) {
            const value = data[key];
            const error = checkRules(key, value);

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
        validateField,
        setErrors
    }
}

export {
    useValidator,
    VALID_RULES,
};