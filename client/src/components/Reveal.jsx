import { motion } from 'framer-motion'
import clsx from 'clsx'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

export default function Reveal({ children, className, delay = 0, y = 28, ...props }) {
  const { useLiteMotion } = useAdaptiveMotion()

  return (
    <motion.div
      initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={useLiteMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: useLiteMotion ? 0.12 : 0.2 }}
      transition={{ duration: useLiteMotion ? 0.32 : 0.65, delay: useLiteMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
