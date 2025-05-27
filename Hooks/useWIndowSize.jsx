import { useEffect, useState } from "react"

export function useWindowSize() {
    const [WindowSize, SetWindowSize] = useState({ width: window.innerWidth, height: innerHeight })

    useEffect(() => {
        window.addEventListener('resize', () => {
            SetWindowSize({ width: window.innerWidth, height: innerHeight })
        })
    }, [])

    return WindowSize
}