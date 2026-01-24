import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const skills = [
    { name: 'iOS', icon: 'fab fa-apple', accent: 'blue-accent' },
    { name: 'Swift', icon: 'fab fa-swift', accent: 'orange-accent' },
    { name: 'Xcode', icon: 'fas fa-hammer', accent: 'teal-accent' },
    { name: 'UIKit', icon: 'fas fa-layer-group', accent: 'purple-accent' },
    { name: 'SwiftUI', icon: 'fas fa-cubes', accent: 'orange-accent' },
    { name: 'SPM', icon: 'fas fa-box', accent: 'blue-accent' },
    { name: 'CocoaPods', icon: 'fas fa-cube', accent: 'green-accent' },
    { name: 'Firebase', icon: 'fas fa-fire', accent: 'purple-accent' },
    { name: 'REST APIs', icon: 'fas fa-globe', accent: 'blue-accent' },
]

const stats = [
    { value: 3, label: 'Years Learning' },
    { value: 5, label: 'Apps Deployed' },
    { value: 10, label: 'Technologies' },
]

function AnimatedCounter({ value, isInView }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isInView) {
            let current = 0
            const increment = value / 40
            const timer = setInterval(() => {
                current += increment
                if (current >= value) {
                    setCount(value)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(current))
                }
            }, 30)
            return () => clearInterval(timer)
        }
    }, [isInView, value])

    return <>{count}+</>
}

function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <section id="skills" className="skills" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-badge green"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Skills & Expertise
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Technologies I work with
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Proficient in modern iOS development tools and frameworks
                </motion.p>

                {/* Skills Grid */}
                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className={`skill-card ${skill.accent}`}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="skill-icon">
                                <i className={skill.icon} />
                            </div>
                            <span>{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="stats-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <h3 className="stat-number green">
                                <AnimatedCounter value={stat.value} isInView={isInView} />
                            </h3>
                            <p>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
