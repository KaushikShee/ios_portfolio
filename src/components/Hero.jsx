import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const roles = ['iOS Developer', 'Swift Engineer', 'SwiftUI Craftsman', 'App Architect', 'Problem Solver']
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]*#@%'

function RoleScramble() {
    const [text, setText] = useState(roles[0])
    const scramRef = useRef(null)

    useEffect(() => {
        let idx = 0

        const scrambleTo = (target) => {
            const len = target.length
            let frame = 0
            clearInterval(scramRef.current)
            scramRef.current = setInterval(() => {
                let out = ''
                for (let i = 0; i < len; i++) {
                    if (i < frame / 1.6) out += target[i]
                    else out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                }
                setText(out)
                frame++
                if (frame > len * 1.6) {
                    clearInterval(scramRef.current)
                    setText(target)
                }
            }, 32)
        }

        const cycle = setInterval(() => {
            idx = (idx + 1) % roles.length
            scrambleTo(roles[idx])
        }, 2800)

        return () => {
            clearInterval(cycle)
            clearInterval(scramRef.current)
        }
    }, [])

    return <span className="typewriter-text">{text}</span>
}

function Hero() {
    const scrollToAbout = () => {
        const section = document.getElementById('about')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="home" className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    {/* Hero Text */}
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.span
                            className="availability-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <span className="pulse-dot" />
                            Available for work
                        </motion.span>

                        <motion.h1
                            className="hero-title"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                                }
                            }}
                        >
                            {/* "Hi, I'm " split into characters */}
                            {"Hi, I'm ".split('').map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                            {/* Gradient Name */}
                            <motion.span
                                className="gradient-text"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.8 } }
                                }}
                            >
                                Kaushik
                            </motion.span>
                        </motion.h1>

                        <motion.h2
                            className="hero-subtitle"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            {/* Scrambling role text */}
                            <RoleScramble />
                        </motion.h2>

                        <motion.p
                            className="hero-description"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.03, delayChildren: 1.2 }
                                }
                            }}
                        >
                            {"Building high-quality iOS apps with Swift & SwiftUI — crafting fast, polished experiences from the first tap to the last.".split(' ').map((word, index) => (
                                <motion.span
                                    key={index}
                                    style={{ display: 'inline-block', marginRight: '5px' }}
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>

                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <motion.a
                                href="/kaushik.pdf"
                                download="Kaushik_Shee_Resume.pdf"
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <i className="fas fa-download" />
                                Download Resume
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn btn-secondary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <i className="fas fa-envelope" />
                                Contact Me
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="profile-wrapper">
                            <div className="profile-ring" />
                            <div className="profile-photo">
                                <img src="/picc.png" alt="Kaushik Shee" draggable="false" />
                            </div>

                            <motion.div
                                className="floating-badge apple-badge"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <i className="fab fa-apple" />
                            </motion.div>

                            <motion.div
                                className="floating-badge swift-badge"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                            >
                                <img src="/swift-icon.png" alt="Swift" className="swift-icon" draggable="false" />
                            </motion.div>

                            <motion.div
                                className="floating-badge xcode-badge"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            >
                                <img src="/xcode-icon.png" alt="Xcode" className="xcode-icon" draggable="false" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    onClick={scrollToAbout}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 1.2 },
                        y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                >
                    <i className="fas fa-chevron-down" />
                </motion.div>
            </div>

            {/* Floating Background Icons */}
            <div className="floating-icons">
                <motion.div
                    className="floating-icon icon-1"
                    animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <i className="fab fa-apple" />
                </motion.div>
                <motion.div
                    className="floating-icon icon-2"
                    animate={{ y: [0, 15, 0], x: [0, -8, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <i className="fab fa-swift" />
                </motion.div>
                <motion.div
                    className="floating-icon icon-3"
                    animate={{ y: [0, -15, 0], x: [0, 12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <i className="fas fa-mobile-alt" />
                </motion.div>
                <motion.div
                    className="floating-icon icon-4"
                    animate={{ y: [0, 18, 0], x: [0, -10, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                >
                    <i className="fas fa-code" />
                </motion.div>
                <motion.div
                    className="floating-icon icon-5"
                    animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                    transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                    <i className="fas fa-terminal" />
                </motion.div>
                <motion.div
                    className="floating-icon icon-6"
                    animate={{ y: [0, 14, 0], x: [0, -6, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                >
                    <i className="fas fa-cogs" />
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
