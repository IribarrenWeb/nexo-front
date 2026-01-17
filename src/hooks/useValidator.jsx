import { useCallback, useState } from "react";

const VALID_RULES = ['required','email','password','match','minLength','username'];

const useValidator = (data, rules) => {

    const [errors, setErrors] = useState([]);

    // funcion que chequea las reglas de validacion para un campo y valor dado
    const checkRules = useCallback((field, value) => {
        const rule = rules[field];
        
        // si no hay reglas, no hacemos nada
        if (!rule) return '';

        // requerido: el campo no puede estar vacio
        if (rule.required && value?.toString().trim() === '') {
            return 'Este campo es obligatorio';
        }

        // si el campo no es obligatorio y esta vacio, no hacemos mas validaciones
        if (!value || value.toString().trim() === '') return '';


        // email: el campo debe ser un email valido
        if (rule.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Por favor, ingrese un correo electrónico válido';
            }
        }

        // password: la contraseña debe tener al menos 6 caracteres y una mayuscula
        if (rule.password) {
            if (value.length < 6) {
                return 'La contraseña debe tener al menos 6 caracteres';
            }
            if (!/[A-Z]/.test(value)) {
                return 'La contraseña debe contener al menos una letra mayúscula';
            }
        }

        // match: el campo debe coincidir con otro campo
        if (rule.match) {
            const compareField = rule.match;
            console.log('Comparando', value, 'con', data[compareField], 'campo', compareField);
            if (value !== data[compareField]) {
                return `El campo debe ser idéntico a ${compareField}`;
            }
        }

        // minLength: el campo debe tener una longitud minima
        if (rule.minLength) {
            if (value.length < parseInt(rule.minLength)) {
                return `El campo debe tener al menos ${rule.minLength} caracteres`;
            }
        }

        // username: el nombre de usuario solo puede contener letras, numeros y guiones bajos
        if (rule.username) {
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(value)) {
                return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
            }
        }

        return '';
    }, [rules, data]);

    // funcion para validar un campo especifico
    const validateField = (key, value) => {
        const error = checkRules(key, value); // chequeamos las reglas
        
        // si la variable error tiene indices, es que hay un error
        if (error.length) {
            // seteamos los errores por campo
            setErrors(prev => {
                const filtered = prev.filter(e => e.field !== key);
                return [...filtered, {field: key, message: error}];
            });
            return false;
        } else {
            // si no hay error, eliminamos cualquier error previo de ese campo
            setErrors(prev => prev.filter(e => e.field !== key));
            return true;
        }
    }

    // funcion para validar todos los datos
    const validateData = () => {

        // inicializamos un array temporal de errores
        const errorFieldsTemp = [];

        // extraemos las claves de las reglas
        const keys = Object.keys(rules);

        // recorremos las claves y validamos cada campo
        for (let key of keys) {
            const value = data[key]; // valor del campo
            const error = checkRules(key, value);

            if (error.length) {
                errorFieldsTemp.push({field: key, message: error});
            }
        }

        // seteamos los errores
        setErrors(errorFieldsTemp);

        // devolvemos true si no hay errores
        return errorFieldsTemp.length === 0;
    }

    // funcion para limpiar el error de un campo especifico
    const clearErrorKey = (key) => {
        setErrors(prev => prev.filter(e => e.field !== key));
    }

    // funcion para limpiar todos los errores
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