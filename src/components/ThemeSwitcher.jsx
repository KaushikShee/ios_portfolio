import { useState } from 'react'
import { motion } from 'framer-motion'

const themes = {
    citrus: { p: '#FF5C39', p2: '#1F4D52', pRgb: '255, 92, 57', p2Rgb: '31, 77, 82' },
    orchid: { p: '#7C3AED', p2: '#EC4899', pRgb: '124, 58, 237', p2Rgb: '236, 72, 153' },
    lagoon: { p: '#0E9488', p2: '#84CC16', pRgb: '14, 148, 136', p2Rgb: '132, 204, 22' },
}

function ThemeSwitcher() {
    const [active, setActive] = useState('citrus')

    const applyTheme = (name) => {
        const t = themes[name]
        if (!t) return
        const root = document.documentElement.style
        root.setProperty('--p', t.p)
        root.setProperty('--p2', t.p2)
        root.setProperty('--p-rgb', t.pRgb)
        root.setProperty('--p2-rgb', t.p2Rgb)
        setActive(name)
    }

    return (
        <motion.div
            className="theme-switcher"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
        >
            <span className="theme-label">Theme</span>
            {Object.keys(themes).map((name) => (
                <button
                    key={name}
                    type="button"
                    title={name.charAt(0).toUpperCase() + name.slice(1)}
                    className={`theme-swatch ${name} ${active === name ? 'active' : ''}`}
                    onClick={() => applyTheme(name)}
                />
            ))}
        </motion.div>
    )
}

export default ThemeSwitcher
