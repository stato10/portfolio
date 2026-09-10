import { createContext, useContext } from 'react'

export const WindowVisibility = createContext(true)
export const useWindowVisible = () => useContext(WindowVisibility)
