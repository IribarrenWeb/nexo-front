import { redirect } from "react-router-dom";
import { toast } from "sonner";

export const authService = () => {
    const login = async (data) => {
        const { response, loading, execute } = useFetch();

        await execute('/login', 'POST', data);

        if (response.data.token) {
            redirect('/')
            return 
        }

        toast.error(response.error)
        
        return response;
    }

    return {
        login
    }
}
