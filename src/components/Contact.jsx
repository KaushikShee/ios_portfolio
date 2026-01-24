import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '' })

        try {
            // Using Web3Forms for email delivery (free service)
            // Get your access key at: https://web3forms.com/
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'a1f06128-4622-4067-b0a6-83c3e1ca0ced', // Replace with your Web3Forms access key
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact from ${formData.name}`,
                }),
            })

            const result = await response.json()

            if (result.success) {
                setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
                setFormData({ name: '', email: '', message: '' })
            } else {
                throw new Error(result.message || 'Failed to send')
            }
        } catch (error) {
            // Fallback to mailto if Web3Forms fails or not configured
            const { name, email, message } = formData
            const mailtoLink = `mailto:kaushikshee901@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
            window.location.href = mailtoLink
            setStatus({ type: 'info', message: 'Opening your email client...' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear status when user starts typing again
        if (status.message) {
            setStatus({ type: '', message: '' })
        }
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                    </motion.div>

                    {status.message && (
                        <motion.div
                            className={`form-status ${status.type}`}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <i className={status.type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle'} />
                            {status.message}
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        className="btn-submit"
                        whileHover={!isSubmitting ? { scale: 1.02, y: -3 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading-spinner" />
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <i className="fas fa-paper-plane" />
                            </>
                        )}
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
