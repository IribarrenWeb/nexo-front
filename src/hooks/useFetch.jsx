import { useEffect, useRef, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;

export const useFetch = () => {
    const validMethods = ['POST','PUT','GET','DELETE','PATCH'];
    
    const abortControllerRef = useRef();

    const generateAbort = (onlyAbort = false) => {
        
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        if (onlyAbort) {
            abortControllerRef.current = null;
            return;
        }

        abortControllerRef.current = new AbortController();
        
        return abortControllerRef.current.signal;
    }

    const execute = async (url, method = 'GET', data = {}) => {
        if (!validMethods.includes(method.toUpperCase())) throw new Error(`Metodo no valido: ${method}`);

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

            if (!res.ok) {
                throw new Error(`Error en la url ${url} : ${res.status} -> ${res.statusText} `);
            }

            const responseData = await res.json()
            result.data = responseData
        } catch (error) {
            result.error = error instanceof Error ? error : new Error('Error desconocido')
        }
        return result;
    }

    useEffect(() => {
        return () => {
            generateAbort(true)
        }
    }, [])

    return {
        execute
    }
}