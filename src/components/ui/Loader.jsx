import { Loader2 } from "lucide-react";

const Loader = ({show}) => {

    if (!show) return null; // si show es false no renderizamos nada

    return (
        <div className="absolute inset-0 bg-gray-950/50 flex justify-center items-center z-50">
            <div className="flex justify-center items-center">
                <span className="animate-spin">
                    <Loader2 className="h-10 w-10 text-gray-100"/>
                </span>
            </div>
        </div>
    );
}
export default Loader;