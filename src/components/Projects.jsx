import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const projects = [
    {
        title: 'Marina Homes',
        badge: 'Official iOS App',
        badgeColor: 'green',
        description: 'E-commerce app for home interiors with multi-language support and seamless shopping.',
        tags: ['UIKit', 'Firebase', 'REST APIs'],
        link: 'https://apps.apple.com/us/app/marina-home/id6447933191',
    },
    {
        title: 'ODDO ERP System',
        badge: 'In-house App',
        badgeColor: 'teal',
        description: 'Internal event management system with advanced features for enterprise use.',
        tags: ['SwiftUI', 'CoreML', 'AVFoundation'],
        link: '#',
    },
    {
        title: 'Binsina Pharmacy',
        badge: 'Official iOS App',
        badgeColor: 'orange',
        description: 'Healthcare app with comprehensive subscription and loyalty membership systems.',
        tags: ['UIKit', 'Firebase', 'REST APIs'],
        link: 'https://apps.apple.com/us/app/binsina/id1633403246',
    },
]

const bateelContributions = [
    {
        title: 'Custom gifting',
        description: 'Built a three-step gift builder driven by backend product configuration, with stepper navigation and a sticky summary. Hid unavailable box and size combinations, surfaced selected fillings in the cart, and supported deep links into the builder.',
    },
    {
        title: 'Product discovery',
        description: 'Built the “What’s Inside” carousel, item-detail modal, and review form with guest gating and paginated reviews. Added a fullscreen image lightbox and resolved gallery flicker, fast-swipe looping, and stale variant images.',
    },
    {
        title: 'Backend-driven address forms',
        description: 'Rendered address fields from Magento store configuration and integrated map-pin location search, postcode seeding, and delivery instructions. Kept edited addresses aligned with their new map pins and added deletion safeguards.',
    },
    {
        title: 'Cart, checkout & orders',
        description: 'Implemented cart stock limits, quantity guards, free-gift handling, and an animated free-delivery progress bar. Built the order-success experience and order-detail features for shipments, tracking, store credit, reorder, and invoices.',
    },
    {
        title: 'Localization & navigation',
        description: 'Improved English/Arabic experiences with RTL fixes across filters, search, forms, and pickers, plus country-specific language and currency handling. Supported universal links for products, categories, and gifting, including cross-store confirmation.',
    },
    {
        title: 'Quality & UI engineering',
        description: 'Translated Figma designs into token-based interfaces and resolved QA-reported defects across shopping and account flows. Used Jest unit and component tests alongside iOS Simulator and Android Emulator verification.',
    },
]

function Projects() {
    const [activeContribution, setActiveContribution] = useState(0)
    const reducedMotion = useReducedMotion()
    const reveal = {
        initial: reducedMotion ? false : { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
    }

    return (
        <section id="projects" className="projects">
            <div className="container">
                <Motion.div {...reveal} transition={{ duration: 0.45 }}>
                    <span className="section-badge blue">Selected Projects</span>
                    <h2 className="section-title">Work in <span className="accent">practice.</span></h2>
                    <p className="section-subtitle">
                        Native iOS and cross-platform experiences I've helped bring to life.
                    </p>
                </Motion.div>

                <Motion.article
                    id="bateel-case-study"
                    className="bateel-feature"
                    aria-labelledby="bateel-title"
                    tabIndex={-1}
                    {...reveal}
                    transition={{ duration: 0.55 }}
                >
                    <div className="bateel-overview">
                        <span className="feature-eyebrow"><span aria-hidden="true" /> Latest project · iOS & Android</span>
                        <h3 id="bateel-title">Bateel<span className="accent">.</span></h3>
                        <p className="bateel-tagline">Commerce, with a personal touch.</p>
                        <p className="bateel-intro">
                            Custom gifting, thoughtful shopping flows, and English/Arabic experiences.
                            Built for Bateel International LLC at Codilar, with my contributions
                            spanning UI, Magento integration, and quality.
                        </p>
                        <dl className="bateel-facts">
                            <div><dt>My role</dt><dd>React Native Developer</dd></div>
                            <div><dt>Work covered</dt><dd>Jul–Nov 2026</dd></div>
                        </dl>
                        <ul className="feature-tags" aria-label="Core technologies">
                            <li>React Native</li><li>TypeScript</li><li>GraphQL</li>
                        </ul>
                        <details className="bateel-tools">
                            <summary>Full technology stack</summary>
                            <p>React Native, Expo, React, TypeScript, Zustand, MMKV, Apollo / GraphQL,
                                Magento 2 / Adobe Commerce, FlashList, Reanimated, i18next, Sentry, and Jest.</p>
                        </details>
                    </div>

                    <div className="bateel-work">
                        <div className="contribution-heading">
                            <h4>Inside the work</h4><span>06 contributions</span>
                        </div>
                        {bateelContributions.map((contribution, index) => {
                            const isOpen = activeContribution === index
                            return (
                                <div className={`contribution-item${isOpen ? ' is-open' : ''}`} key={contribution.title}>
                                    <h5>
                                        <button
                                            type="button"
                                            id={`contribution-trigger-${index}`}
                                            aria-expanded={isOpen}
                                            aria-controls={`contribution-panel-${index}`}
                                            onClick={() => setActiveContribution(isOpen ? null : index)}
                                        >
                                            <span className="contribution-number">{String(index + 1).padStart(2, '0')}</span>
                                            <span>{contribution.title}</span>
                                            <span className="contribution-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                                        </button>
                                    </h5>
                                    <div
                                        id={`contribution-panel-${index}`}
                                        role="region"
                                        aria-labelledby={`contribution-trigger-${index}`}
                                        aria-hidden={!isOpen}
                                    >
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <Motion.div
                                                    key="content"
                                                    initial={{ height: reducedMotion ? 'auto' : 0, opacity: reducedMotion ? 1 : 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                                                    className="contribution-panel"
                                                >
                                                    <p>{contribution.description}</p>
                                                </Motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Motion.article>

                <div className="other-projects-heading"><h3>More selected work</h3><span>Native iOS & enterprise</span></div>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <Motion.article
                            key={project.title}
                            className="project-card"
                            {...reveal}
                            whileHover={reducedMotion ? undefined : { y: -5 }}
                            transition={{ duration: 0.4, delay: reducedMotion ? 0 : index * 0.06 }}
                        >
                            <span className={`project-badge ${project.badgeColor}`}>{project.badge}</span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                            {project.link !== '#' ? (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                    View app <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
                                </a>
                            ) : <span className="project-private"><i className="fas fa-lock" aria-hidden="true" /> Internal project</span>}
                        </Motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
