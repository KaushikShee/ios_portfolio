import { useEffect, useRef } from 'react'

// A small fluid grid advects colour and velocity without adding a graphics dependency.
function HeroColorTrail() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const hero = canvas.parentElement
        const context = canvas.getContext('2d', { alpha: true })
        const fluidCanvas = document.createElement('canvas')
        const fluidContext = fluidCanvas.getContext('2d', { alpha: true })
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
        const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine)')
        if (!context || !fluidContext) return

        const palette = [
            [1, 0.22, 0.11], // coral
            [0.82, 0.12, 0.39], // raspberry
            [0.43, 0.18, 0.83], // violet
            [0.05, 0.53, 0.56], // teal
        ]
        let width, height, size, vx, vy, red, green, blue, nextVx, nextVy, nextRed, nextGreen, nextBlue, curl, image
        let frame = 0
        let lastPoint = null
        let lastInput = 0
        let colorPosition = 0
        let visible = true

        const resize = () => {
            const rect = hero.getBoundingClientRect()
            width = 170
            height = Math.max(70, Math.min(220, Math.round(width * rect.height / Math.max(rect.width, 1))))
            // Simulate on a small grid, then smoothly resample it onto a sharper display canvas.
            fluidCanvas.width = width
            fluidCanvas.height = height
            const scale = Math.min(window.devicePixelRatio || 1, 1.5, 1600 / Math.max(rect.width, 1), 1600 / Math.max(rect.height, 1))
            canvas.width = Math.max(1, Math.round(rect.width * scale))
            canvas.height = Math.max(1, Math.round(rect.height * scale))
            context.imageSmoothingEnabled = true
            context.imageSmoothingQuality = 'high'
            size = width * height
            vx = new Float32Array(size); vy = new Float32Array(size)
            red = new Float32Array(size); green = new Float32Array(size); blue = new Float32Array(size)
            nextVx = new Float32Array(size); nextVy = new Float32Array(size)
            nextRed = new Float32Array(size); nextGreen = new Float32Array(size); nextBlue = new Float32Array(size)
            curl = new Float32Array(size)
            image = fluidContext.createImageData(width, height)
            lastPoint = null
        }

        const clear = () => {
            cancelAnimationFrame(frame)
            frame = 0
            lastPoint = null
            if (vx) {
                vx.fill(0); vy.fill(0); red.fill(0); green.fill(0); blue.fill(0)
                context.clearRect(0, 0, canvas.width, canvas.height)
            }
        }

        const sample = (field, x, y) => {
            x = Math.max(0, Math.min(width - 1.001, x))
            y = Math.max(0, Math.min(height - 1.001, y))
            const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0
            const i = y0 * width + x0
            return field[i] * (1 - fx) * (1 - fy) + field[i + 1] * fx * (1 - fy)
                + field[i + width] * (1 - fx) * fy + field[i + width + 1] * fx * fy
        }

        const draw = (time) => {
            frame = 0
            if (!visible || document.hidden || motionPreference.matches || !pointerPreference.matches || time - lastInput > 8000) {
                clear()
                return
            }

            // Curl feeds little eddies back into the velocity field for ink-like movement.
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const i = y * width + x
                    curl[i] = (vy[i + 1] - vy[i - 1] - vx[i + width] + vx[i - width]) * 0.5
                }
            }
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const i = y * width + x
                    let nx = Math.abs(curl[i + 1]) - Math.abs(curl[i - 1])
                    let ny = Math.abs(curl[i + width]) - Math.abs(curl[i - width])
                    const length = Math.hypot(nx, ny) + 0.0001
                    nx /= length; ny /= length
                    const flowX = vx[i] + ny * curl[i] * 0.2
                    const flowY = vy[i] - nx * curl[i] * 0.2
                    const fromX = x - flowX, fromY = y - flowY
                    nextVx[i] = sample(vx, fromX, fromY) * 0.985
                    nextVy[i] = sample(vy, fromX, fromY) * 0.985
                    nextRed[i] = sample(red, fromX, fromY) * 0.993
                    nextGreen[i] = sample(green, fromX, fromY) * 0.993
                    nextBlue[i] = sample(blue, fromX, fromY) * 0.993
                    const strength = Math.max(nextRed[i], nextGreen[i], nextBlue[i])
                    const pixel = i * 4
                    if (strength > 0.005) {
                        image.data[pixel] = Math.min(255, nextRed[i] / strength * 255)
                        image.data[pixel + 1] = Math.min(255, nextGreen[i] / strength * 255)
                        image.data[pixel + 2] = Math.min(255, nextBlue[i] / strength * 255)
                        image.data[pixel + 3] = Math.min(220, strength * 220)
                    } else image.data[pixel + 3] = 0
                }
            }
            ;[vx, nextVx] = [nextVx, vx]; [vy, nextVy] = [nextVy, vy]
            ;[red, nextRed] = [nextRed, red]; [green, nextGreen] = [nextGreen, green]; [blue, nextBlue] = [nextBlue, blue]
            fluidContext.putImageData(image, 0, 0)
            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(fluidCanvas, 0, 0, canvas.width, canvas.height)
            frame = requestAnimationFrame(draw)
        }

        const splat = (x, y, dx, dy, color) => {
            const radius = 7
            for (let py = Math.max(1, Math.floor(y - radius * 2)); py < Math.min(height - 1, y + radius * 2); py++) {
                for (let px = Math.max(1, Math.floor(x - radius * 2)); px < Math.min(width - 1, x + radius * 2); px++) {
                    const distance = ((px - x) ** 2 + (py - y) ** 2) / (radius * radius)
                    const amount = Math.exp(-distance * 1.3)
                    if (amount < 0.015) continue
                    const i = py * width + px
                    vx[i] = Math.max(-3, Math.min(3, vx[i] + dx * amount * 0.32))
                    vy[i] = Math.max(-3, Math.min(3, vy[i] + dy * amount * 0.32))
                    red[i] = Math.min(1.4, red[i] + color[0] * amount * 0.8)
                    green[i] = Math.min(1.4, green[i] + color[1] * amount * 0.8)
                    blue[i] = Math.min(1.4, blue[i] + color[2] * amount * 0.8)
                }
            }
        }

        const onPointerMove = (event) => {
            if (event.pointerType === 'touch' || !visible || document.hidden || motionPreference.matches || !pointerPreference.matches) return
            const bounds = hero.getBoundingClientRect()
            const point = { x: (event.clientX - bounds.left) / bounds.width * width, y: (event.clientY - bounds.top) / bounds.height * height }
            const previous = lastPoint || point
            const dx = point.x - previous.x, dy = point.y - previous.y
            const distance = Math.hypot(dx, dy)
            if (lastPoint && distance < 0.7) return
            const steps = Math.min(12, Math.max(1, Math.ceil(distance / 3)))
            const paletteIndex = Math.floor(colorPosition / 18) % palette.length
            const nextIndex = (paletteIndex + 1) % palette.length
            const mix = (colorPosition % 18) / 18
            const color = palette[paletteIndex].map((value, i) => value * (1 - mix) + palette[nextIndex][i] * mix)
            for (let step = 1; step <= steps; step++) {
                splat(previous.x + dx * step / steps, previous.y + dy * step / steps, dx / steps, dy / steps, color)
            }
            colorPosition += steps
            lastPoint = point
            lastInput = performance.now()
            if (!frame) frame = requestAnimationFrame(draw)
        }

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (!visible) clear()
        })
        const onVisibilityChange = () => { if (document.hidden) clear() }
        const onPointerLeave = () => { lastPoint = null }
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(hero)
        observer.observe(hero)
        hero.addEventListener('pointermove', onPointerMove, { passive: true })
        hero.addEventListener('pointerleave', onPointerLeave)
        document.addEventListener('visibilitychange', onVisibilityChange)
        motionPreference.addEventListener('change', clear)
        pointerPreference.addEventListener('change', clear)
        resize()

        return () => {
            clear()
            observer.disconnect(); resizeObserver.disconnect()
            hero.removeEventListener('pointermove', onPointerMove)
            hero.removeEventListener('pointerleave', onPointerLeave)
            document.removeEventListener('visibilitychange', onVisibilityChange)
            motionPreference.removeEventListener('change', clear)
            pointerPreference.removeEventListener('change', clear)
        }
    }, [])

    return <canvas ref={canvasRef} className="hero-color-trail" aria-hidden="true" />
}

export default HeroColorTrail
