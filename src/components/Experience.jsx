import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experienceItems = [
    'Worked on ecommerce-based iOS projects using UIKit',
    'Implemented complex features and workflows',
    'Multi-language app support',
    'Login systems using Firebase',
    'Push notification integration',
]

function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
            },
        },
    }

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <section id="experience" className="experience" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-badge orange"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Experience
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Work Experience
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Professional journey in iOS development
                </motion.p>

                <div className="experience-timeline">
                    <motion.div
                        className="timeline-line"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ transformOrigin: 'top' }}
                    />

                    <motion.div
                        className="experience-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="experience-header">
                            <div className="experience-info">
                                <motion.div
                                    className="company-icon"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                                >
                                    <i className="fas fa-building" />
                                </motion.div>
                                <div>
                                    <h3>iOS Developer</h3>
                                    <span className="company-name">Codilar Technologies Pvt Ltd</span>
                                </div>
                            </div>
                            <motion.span
                                className="experience-date"
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <i className="fas fa-calendar" />
                                2024 - Present
                            </motion.span>
                        </div>

                        <motion.ul
                            className="experience-list"
                            variants={listVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                        >
                            {experienceItems.map((item, index) => (
                                <motion.li key={index} variants={listItemVariants}>
                                    <i className="fas fa-check-circle" />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Experience
