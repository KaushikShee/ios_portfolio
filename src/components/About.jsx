import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const aboutCards = [
    { icon: 'fas fa-mobile-alt', title: 'iOS Development', desc: 'Native apps with Swift & SwiftUI' },
    { icon: 'fas fa-code', title: 'Clean Code', desc: 'Following Apple guidelines & best practices' },
    { icon: 'fas fa-bolt', title: 'Performance', desc: 'Optimized & responsive applications' },
    { icon: 'fas fa-users', title: 'Collaboration', desc: 'Agile teams & version control' },
]

function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-badge blue"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.span>

                <div className="about-content">
                    {/* About Text */}
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="about-title">
                            Crafting iOS experiences<br />
                            <span className="text-muted">that users love</span>
                        </h2>
                        <p className="about-description">
                            Passionate and detail-oriented iOS Developer with hands-on experience building, testing, and deploying iOS applications using Swift and SwiftUI. Proficient in developing user-friendly interfaces, integrating RESTful APIs, managing app lifecycle, and working with Apple frameworks such as UIKit, AVFoundation, CoreData, and WebKit. Experienced in version control (Git), debugging, and collaborating in Agile teams. Eager to contribute to high-quality mobile products and continuously learn emerging iOS technologies.
                        </p>
                        <div className="about-tags icon-tags">
                            {[
                                { icon: 'fab fa-swift', name: 'Swift' },
                                { icon: 'fab fa-apple', name: 'UIKit' },
                                { icon: 'fas fa-layer-group', name: 'SwiftUI' },
                                { icon: 'fas fa-sync-alt', name: 'Agile' }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    className="tag-icon"
                                    title={item.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.2, rotate: 10, color: 'var(--accent-blue)' }}
                                >
                                    <i className={item.icon} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* About Cards */}
                    <motion.div
                        className="about-cards"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                    >
                        {aboutCards.map((card, index) => (
                            <motion.div
                                key={index}
                                className="about-card"
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="card-icon blue">
                                    <i className={card.icon} />
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
