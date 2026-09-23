'use client'
import { motion } from 'framer-motion'
import { FaPhone } from 'react-icons/fa6'

export default function FloatingCallButton() {
  return (
    <motion.a
      href="tel:0424424444"
      className="floating-call glow-pulse"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <FaPhone />
      <span>0424 424 444</span>
    </motion.a>
  )
}
