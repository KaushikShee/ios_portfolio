import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, message } = formData
        const mailtoLink = `mailto:kaushikshee901@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
        window.location.href = mailtoLink
        setFormData({ name: '', email: '', message: '' })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const socialLinks = [
        { href: 'mailto:kaushikshee901@gmail.com', icon: 'fas fa-envelope' },
        { href: 'https://linkedin.com/in/kaushikshee', icon: 'fab fa-linkedin-in' },
        { href: 'https://github.com/kaushikshee', icon: 'fab fa-github' },
    ]

    return (
        <section id="contact" className="contact" ref={ref}>
            <div className="container">
                <motion.h2
                    className="contact-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    Let's Work Together
                </motion.h2>

                <motion.p
                    className="contact-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Have a project in mind? Let's create something amazing.
                </motion.p>

                <motion.form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-row">
                        <motion.div
                            className="form-group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                        <motion.div
                            className="form-group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Tell me about your project..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="btn-submit"
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        Send Message
                        <i className="fas fa-paper-plane" />
                    </motion.button>
                </motion.form>

                <motion.div
                    className="contact-links"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.href}
                            target={social.href.startsWith('http') ? '_blank' : undefined}
                            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="contact-link-item"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.7 + index * 0.1 }}
                        >
                            <i className={social.icon} />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
