import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export type Theme = "light" | "dark"

type ThemeProviderProps = {
    children: ReactNode
    storageKey?: string
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
    children,
    storageKey = "ev-display-mode",
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem(storageKey) as Theme
        if (saved) return saved

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
        return "light"
    })

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        root.classList.add(theme)

        localStorage.setItem(storageKey, theme)
    }, [theme, storageKey])

    return (
        <ThemeProviderContext.Provider
            value={{
                theme,
                setTheme: setThemeState
            }}
        >
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")
    return context
}
