import { PropsWithChildren } from "react"
import { motion } from "motion/react"

type Props = PropsWithChildren<{ label: string }>

export const ZoneButtonIcon = ({ label, children }: Props) => {
  return (
    <motion.div
      key={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      exit={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className="absolute bottom-2 right-2"
    >
      {children}
    </motion.div>
  )
}
