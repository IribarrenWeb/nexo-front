import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/helpers";

export const Dropdown = ({children, actions, className, triggerClass}) => {
    const [droped, setDroped] = useState(false);
    
    return (
        <div className={cn('relative inline-block text-left', className)}>
            <div>
                <button onClick={() => setDroped(true)} type="button" className={cn("inline-flex w-full justify-between items-center rounded-md bg-opacity-10 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-20 focus:outline-none cursor-pointer", triggerClass)}>
                    {children}
                    {
                        droped ? <ChevronUp className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" /> : <ChevronDown className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    }
                </button>
            </div>
            
            { droped ?
                <>
                    <div className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {actions.map((action, index) => (
                                <a
                                    key={index}
                                    href={action.href || '#'}
                                    onClick={action.onClick}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    {action.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="backdrop bg-transparent z-40 fixed top-0 bottom-0 left-0 right-0" onClick={() => setDroped(false)}></div>
                </> 
                : null
            }
        </div>
    )
}

export default Dropdown;