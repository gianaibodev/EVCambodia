import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const isLight = theme === "light"

    return (
        <button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-black/10 dark:border-white/20 bg-white/85 dark:bg-black/40 text-slate-900 dark:text-white backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95"
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
    )
}

export function MobileFloatingToggle() {
    const { theme, setTheme } = useTheme()

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <button
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-background border border-border rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
        >
            {theme === "light" && <Sun className="h-6 w-6" />}
            {theme === "dark" && <Moon className="h-6 w-6" />}
        </button>
    )
}
