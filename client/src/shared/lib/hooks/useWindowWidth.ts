import { useEffect, useState } from "react";

export const useWindowWidth = (breakpoint: number = 767) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth ?? 0)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        
        window.addEventListener('resize', handleResize)
        return () =>  window.removeEventListener('resize', handleResize)
    }, [])

    const isMobile = windowWidth <= breakpoint

    return { windowWidth, isMobile }
}