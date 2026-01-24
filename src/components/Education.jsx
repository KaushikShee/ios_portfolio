import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const languages = [
    { name: 'English', level: 'Professional', progress: 90, color: '' },
    { name: 'Hindi', level: 'Native', progress: 100, color: 'orange' },
    { name: 'Bengali', level: 'Native', progress: 100, color: 'blue' },
]

function LanguageBar({ language, isInView, delay }) {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setWidth(language.progress)
            }, delay * 1000)
            return () => clearTimeout(timer)
        }
    }, [isInView, language.progress, delay])

    return (
        <motion.div
            className="language-item"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="language-header">
                <span>{language.name}</span>
                <span>{language.level}</span>
            </div>
            <div className="language-bar">
                <motion.div
                    className={`language-progress ${language.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + 0.2 }}
                />
            </div>
        </motion.div>
    )
}

function Education() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="education" className="education" ref={ref}>
            <div className="container">
                <div className="education-grid">
                    {/* Education Block */}
                    <motion.div
                        className="education-block"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="section-badge purple">Education</span>
                        <h2 className="block-title">Academic Background</h2>

                        <motion.div
                            className="education-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <motion.div
                                className="edu-icon"
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.4, type: 'spring' }}
                            >
                                <i className="fas fa-graduation-cap" />
                            </motion.div>
                            <div className="edu-info">
                                <h3>Bachelor of Computer Applications</h3>
                                <p className="edu-institution">Gurunanak Institute of Technology, Kolkata</p>
                                <span className="edu-year">2019 - 2023</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Languages Block */}
                    <motion.div
                        className="languages-block"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="section-badge cyan">Languages</span>
                        <h2 className="block-title">Languages I Speak</h2>

                        <div className="language-bars">
                            {languages.map((language, index) => (
                                <LanguageBar
                                    key={language.name}
                                    language={language}
                                    isInView={isInView}
                                    delay={0.4 + index * 0.15}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Education
