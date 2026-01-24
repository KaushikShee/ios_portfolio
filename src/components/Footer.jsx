import { motion } from 'framer-motion'

function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <p>&copy; 2025 Kaushik Shee. All rights reserved.</p>
            </div>
        </motion.footer>
    )
}

export default Footer
