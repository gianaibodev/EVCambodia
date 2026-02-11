import { Moon, Sun } from "lucide-react"
import { useTheme, Theme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const modes: { value: Theme; icon: any; label: string }[] = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
    ]

    return (
        <div className="flex bg-bg-secondary/50 backdrop-blur-md border border-border p-1 rounded-full shadow-sm w-fit">
            {modes.map((m) => {
                const Icon = m.icon
                const isActive = theme === m.value
                return (
                    <button
                        key={m.value}
                        onClick={() => setTheme(m.value)}
                        className={cn(
                            "flex items-center justify-center p-2 rounded-full transition-all duration-200",
                            isActive
                                ? "bg-background text-text-primary shadow-sm scale-110"
                                : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                        )}
                        title={`${m.label} Mode`}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                )
            })}
        </div>
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
