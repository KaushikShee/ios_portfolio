import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'playground', label: 'Playground' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
]

function Navbar() {
    const [activeSection, setActiveSection] = useState('home')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
    const navMenuRef = useRef(null)
    const linkRefs = useRef({})

    // Update indicator position - dot below the link
    const updateIndicator = (sectionId) => {
        const linkEl = linkRefs.current[sectionId]
        if (linkEl && navMenuRef.current) {
            const navRect = navMenuRef.current.getBoundingClientRect()
            const linkRect = linkEl.getBoundingClientRect()
            // Center the dot under the link
            setIndicatorStyle({
                width: 5,
                left: linkRect.left - navRect.left + (linkRect.width / 2) - 2.5,
            })
        }
    }

    // Handle scroll to update active section and navbar style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Find current section
            const sections = navLinks.map(link => document.getElementById(link.id))
            const scrollPosition = window.scrollY + 150

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    if (activeSection !== navLinks[i].id) {
                        setActiveSection(navLinks[i].id)
                    }
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        return () => window.removeEventListener('scroll', handleScroll)
    }, [activeSection])

    // Update indicator when active section changes
    useEffect(() => {
        updateIndicator(activeSection)
    }, [activeSection])

    // Update indicator on resize
    useEffect(() => {
        const handleResize = () => updateIndicator(activeSection)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [activeSection])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault()
        }

        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.documentElement.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
            document.body.style.top = `-${window.scrollY}px`
            // Prevent touchmove on the body
            document.body.addEventListener('touchmove', preventScroll, { passive: false })
        } else {
            const scrollY = document.body.style.top
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1)
            }
            document.body.removeEventListener('touchmove', preventScroll)
        }
        return () => {
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
            document.body.style.position = ''
            document.body.style.width = ''
            document.body.style.top = ''
            document.body.removeEventListener('touchmove', preventScroll)
        }
    }, [isMobileMenuOpen])

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            const offset = 100
            const top = section.offsetTop - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                className={`navbar ${isScrolled ? 'scrolled' : ''}`}
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="nav-container">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="nav-logo"
                        onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        KS<span className="logo-dot">.</span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="nav-menu" ref={navMenuRef}>
                        {/* Animated indicator */}
                        <motion.div
                            className="nav-indicator"
                            animate={{
                                width: indicatorStyle.width,
                                left: indicatorStyle.left,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 30,
                            }}
                        />

                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                ref={(el) => (linkRefs.current[link.id] = el)}
                                href={`#${link.id}`}
                                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollToSection(link.id)
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Resume Button */}
                    <motion.a
                        href="/kaushik.pdf"
                        download="Kaushik_Shee_Resume.pdf"
                        className="btn-resume"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <i className="fas fa-download" />
                        Resume
                    </motion.a>

                    {/* Hamburger Menu */}
                    <div
                        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.id}
                                href={`#${link.id}`}
                                className={activeSection === link.id ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollToSection(link.id)
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.a
                            href="/kaushik.pdf"
                            download="Kaushik_Shee_Resume.pdf"
                            className="btn-resume"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <i className="fas fa-download" />
                            Download Resume
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
