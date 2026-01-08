import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

// metodo para unir clases de tailwind de forma condicional
const cn = (...inputs) => {
    return twMerge(clsx(inputs));
}

export {
    cn
}
