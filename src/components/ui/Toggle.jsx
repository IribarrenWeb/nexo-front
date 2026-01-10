import { cn } from "../../utils/helpers";

const Toggle = ({ enabled, setEnabled, label }) => {
    return (
        <div className="flex items-center">
            <button
                type="button"
                className={cn(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled(!enabled)}
            >
                <span
                    className={cn(
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </button>
            {label ? (
                <span className="ml-3 text-sm font-medium text-gray-700">
                    {label}
                </span>
            ) : null}
        </div>
    );
}

export default Toggle;