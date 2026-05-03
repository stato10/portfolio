import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/** shadcn-style class merge — works with Tailwind conflict resolution */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
