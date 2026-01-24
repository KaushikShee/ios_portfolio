import { motion } from 'framer-motion'

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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            Hi, I'm <span className="gradient-text">Kaushik</span>
                        </motion.h1>

                        <motion.h2
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            iOS Developer
                        </motion.h2>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            Building high-quality iOS apps with Swift & SwiftUI
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
                                <img src="/user.jpg" alt="Kaushik Shee" />
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
                                <i className="fab fa-swift" />
                            </motion.div>

                            <motion.div
                                className="floating-badge xcode-badge"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            >
                                <i className="fas fa-laptop-code" />
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
        </section>
    )
}

export default Hero
