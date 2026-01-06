import { useState } from "react"

export const useFetch = (url, method = 'GET', data = {}) => {
    const [dataReturn, setDataReturn] = useState({
        data: null,
        loading: false,
        error: null
    })

    const validMethods = ['POST','PUT','GET','DELETE','PATCH'];

    const generateAbort = () => {
        const abort = new AbortController()
        return { abort, signal: abort.signal }
    }

    const execFetch = async (signal) => {
        if (!validMethods.includes(method.toUpperCase())) throw new Error(`Metodo no valido: ${method}`);

        const responseJson = {
            data: null,
            loading: false,
            error: null
        }

        try {
            setDataReturn({data: null, loading: true, error: null})
            const response = await fetch(url, {
                method: method.toUpperCase(),
                signal
            })

            if (!response.ok) {
                throw new Error(`Error en la url ${url} : ${response.status} -> ${response.statusText} `);
            }

            const responseData = response.json()
            responseJson.data = responseData
        } catch (error) {
            responseJson.error = error instanceof Error ? error : new Error('Error desconocido')
        }

        setDataReturn({ data: responseJson.data, loading: responseJson.loading, error: responseJson.error });
    }

    useEffect(() => {
        const {abort, signal} = generateAbort()
        execFetch(signal)

        return () => {
            abort.abort()
        }
    }, [url, method, data])

    return {
        dataReturn
    }
}