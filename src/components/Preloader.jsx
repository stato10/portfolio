import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500) // Duration of the "Paint is drying" effect

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] grid place-items-center bg-bg-primary"
                >
                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                            className="font-display text-2xl md:text-4xl text-primary tracking-widest text-center"
                        >
                            THE PAINT<br />
                            <span className="text-text-muted">IS DRYING...</span>
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
