import { useEffect } from 'react'

function CustomCursor() {
    useEffect(() => {
        if (!window.matchMedia('(pointer:fine)').matches) return

        document.documentElement.classList.add('has-cursor')
        const dot = document.createElement('div')
        dot.className = 'cur-dot'
        const ring = document.createElement('div')
        ring.className = 'cur-ring'
        document.body.append(dot, ring)

        let mx = window.innerWidth / 2
        let my = window.innerHeight / 2
        let rx = mx
        let ry = my
        let raf

        const onMove = (e) => {
            mx = e.clientX
            my = e.clientY
            dot.style.transform = `translate(${mx}px,${my}px)`
        }

        const loop = () => {
            rx += (mx - rx) * 0.2
            ry += (my - ry) * 0.2
            ring.style.transform = `translate(${rx}px,${ry}px)`
            raf = requestAnimationFrame(loop)
        }

        const interactive = 'a, button, input, textarea, .skill-card, .about-card, .project-card, .stat-card, .experience-card, .education-card, .profile-wrapper, .hamburger'
        const onOver = (e) => {
            if (e.target.closest(interactive)) ring.classList.add('big')
            else ring.classList.remove('big')
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)
        loop()

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
            cancelAnimationFrame(raf)
            document.documentElement.classList.remove('has-cursor')
            dot.remove()
            ring.remove()
        }
    }, [])

    return null
}

export default CustomCursor
