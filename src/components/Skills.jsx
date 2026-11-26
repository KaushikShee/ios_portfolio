import { motion as Motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const skillGroups = [
    {
        title: 'Native iOS',
        description: 'Built for the Apple ecosystem.',
        icon: 'fab fa-apple',
        skills: ['Swift', 'SwiftUI', 'UIKit', 'iOS', 'Xcode', 'SPM', 'CocoaPods'],
    },
    {
        title: 'Cross-platform',
        description: 'One experience. Both platforms.',
        icon: 'fab fa-react',
        skills: ['React Native', 'Expo', 'TypeScript', 'Zustand'],
    },
    {
        title: 'Commerce & APIs',
        description: 'Connecting interfaces to real data.',
        icon: 'fas fa-code',
        skills: ['GraphQL / Apollo', 'Magento', 'REST APIs', 'Firebase'],
    },
    {
        title: 'Quality & localization',
        description: 'Considered details, across markets.',
        icon: 'fas fa-language',
        skills: ['Jest', 'Sentry', 'i18next', 'Arabic / RTL'],
    },
]

const stats = [
    { value: 3, label: 'Years Learning' },
    { value: 5, label: 'Apps Deployed' },
    { value: 10, label: 'Technologies' },
]

function AnimatedCounter({ value, isInView, reducedMotion }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView || reducedMotion) return
        let current = 0
        const timer = setInterval(() => {
            current = Math.min(value, current + value / 30)
            setCount(Math.floor(current))
            if (current >= value) clearInterval(timer)
        }, 30)
        return () => clearInterval(timer)
    }, [isInView, value, reducedMotion])

    return <>{reducedMotion ? value : count}+</>
}

function Skills() {
    const statsRef = useRef(null)
    const statsInView = useInView(statsRef, { once: true })
    const reducedMotion = useReducedMotion()
    const reveal = {
        initial: reducedMotion ? false : { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
    }

    return (
        <section id="skills" className="skills">
            <div className="container">
                <Motion.div {...reveal} transition={{ duration: 0.45 }}>
                    <span className="section-badge green">Skills & Expertise</span>
                    <h2 className="section-title">
                        A toolkit for <span className="accent">mobile.</span>
                    </h2>
                    <p className="section-subtitle">
                        From native interfaces to connected commerce. The tools I use to bring it together.
                    </p>
                </Motion.div>

                <div className="skill-groups">
                    {skillGroups.map((group, index) => (
                        <Motion.article
                            key={group.title}
                            className="skill-group"
                            {...reveal}
                            transition={{ duration: 0.45, delay: reducedMotion ? 0 : (index % 2) * 0.08 }}
                            whileHover={reducedMotion ? undefined : { y: -4 }}
                        >
                            <div className="skill-group-heading">
                                <span className="skill-group-icon"><i className={group.icon} aria-hidden="true" /></span>
                                <div>
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                </div>
                            </div>
                            <ul className="skill-chips" aria-label={`${group.title} technologies`}>
                                {group.skills.map(skill => <li key={skill}>{skill}</li>)}
                            </ul>
                        </Motion.article>
                    ))}
                </div>

                <div className="skills-stats" ref={statsRef}>
                    {stats.map(stat => (
                        <div className="skills-stat" key={stat.label}>
                            <span className="skills-stat-number" aria-hidden="true">
                                <AnimatedCounter value={stat.value} isInView={statsInView} reducedMotion={reducedMotion} />
                            </span>
                            <span className="sr-only">{stat.value}+ </span>
                            <span>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
