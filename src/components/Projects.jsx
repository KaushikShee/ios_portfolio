import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
    {
        title: 'Marina Homes',
        badge: 'Official iOS App',
        badgeColor: 'green',
        glowColor: 'green-glow',
        description: 'E-commerce app for home interiors with multi-language support and seamless shopping...',
        tags: ['UIKit', 'Firebase', 'REST APIs'],
        link: 'https://apps.apple.com/us/app/marina-home/id6447933191',
    },
    {
        title: 'ODDO ERP System',
        badge: 'In-house App',
        badgeColor: 'teal',
        glowColor: 'teal-glow',
        description: 'Internal event management system with advanced features for enterprise use.',
        tags: ['SwiftUI', 'CoreML', 'AVFoundation'],
        link: '#',
    },
    {
        title: 'Binsina Pharmacy',
        badge: 'Official iOS App',
        badgeColor: 'orange',
        glowColor: 'orange-glow',
        description: 'Healthcare app with comprehensive subscription and loyalty membership systems.',
        tags: ['UIKit', 'Firebase', 'REST APIs'],
        link: 'https://apps.apple.com/us/app/binsina/id1633403246',
    },
]

function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    }

    return (
        <section id="projects" className="projects" ref={ref}>
            <div className="container">
                <motion.span
                    className="section-badge blue"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Projects
                </motion.span>

                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Featured <span className="accent">Work</span>
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    A showcase of iOS applications I've built and contributed to
                </motion.p>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={`project-card ${project.glowColor}`}
                            variants={cardVariants}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className={`project-badge ${project.badgeColor}`}>
                                {project.badge}
                            </span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, tagIndex) => (
                                    <motion.span
                                        key={tagIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.5 + tagIndex * 0.1 }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                            <motion.a
                                href={project.link}
                                target={project.link !== '#' ? '_blank' : undefined}
                                rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                                className="project-link"
                                whileHover={{ x: 5 }}
                            >
                                View Details <i className="fas fa-chevron-right" />
                            </motion.a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Projects
