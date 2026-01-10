import { useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // contante con la url de la api

export const useFetch = () => {
    const validMethods = ['POST','PUT','GET','DELETE','PATCH']; // metodos valids
    
    const abortControllerRef = useRef(); // abort controller para cancelar peticiones
    const navigate = useNavigate();

    /**
     * Funcion para generar un abort y cancelar peticiones en curso
     * @param {boolean} onlyAbort 
     * @returns 
     */
    const generateAbort = (onlyAbort = false) => {
        
        // si existe un abort, abortar la peticion
        // para evitar solapar las peticiones
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // si solo es para abortar, 
        // limpiamos y cortamos la ejecucion
        if (onlyAbort) {
            abortControllerRef.current = null;
            return;
        }

        abortControllerRef.current = new AbortController();
        
        return abortControllerRef.current.signal;
    }


    /**
     * Metodo para ejecutar las peticiones fetch
     * @param {string} url 
     * @param {string} method 
     * @param {object} data 
     * @returns 
     */
    const execute = useCallback(async (url, method = 'GET', data = {}) => {
        if (!validMethods.includes(method.toUpperCase())) throw new Error(`Metodo no valido: ${method}`);
        const actualPath = window.location.pathname;

        const result = {
            data: null,
            error: null
        }

        try {
            const signal = generateAbort()
            const access_token = localStorage.getItem('access_token');

            const options = {
              method: method.toUpperCase(),
              signal,
              headers: {
                'Content-Type': 'application/json',
              }
            }

            if (access_token) {
                options.headers['Authorization'] = `Bearer ${access_token}`;
            }

            if (method.toUpperCase() != 'GET') {
                options.body = JSON.stringify(data);
            } else {
                url += Object.keys(data).length ? '?' + new URLSearchParams(data).toString() : '';
            }

            const res = await fetch(API_URL + url, options);
            result.data = await res.json();

            if (!res.ok) {
                let message = result.data.mensaje ?? 'Ocurrio algo inesperado';
                if (res.status === 401 && actualPath != '/login') { // si es 401 (no autrizado), redirigir al login
                    navigate('/login');
                    message = 'No autorizado. Redirigiendo al login.';
                }
                throw new Error(message);
            }
        } catch (error) {
            result.error = error instanceof Error ? error : new Error('Error desconocido')
            
            if (error.name === 'AbortError') result.error = null; // si es un abort, omitir el error
        }
        return result;
    }, [])

    useEffect(() => {
        return () => {
            generateAbort(true)
        }
    }, [])

    return {
        execute
    }
}