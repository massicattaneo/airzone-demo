import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom"
import { CoolIcon, HeatIcon, PowerIcon } from "@az/assets"
import styles from "./ZoneButton.module.css"
import { stateStyles } from "./ZoneButton.styles"

type ZoneButtonProps = {
  zoneName: string
  ambientTemp: number | undefined | null
  targetTemp: number
  isOn: boolean
  onToggle: () => void
  to: string
}

const getState = (isOn: boolean, ambient: number | undefined | null, target: number) => {
  if (!isOn) return "off"
  if (!ambient) return "unknown"
  if (ambient < target) return "heating"
  if (ambient > target) return "cooling"
  return "comfort"
}

const ZoneButton = ({ zoneName, ambientTemp, targetTemp, isOn, to, onToggle }: ZoneButtonProps) => {
  const state = useMemo(
    () => getState(isOn, ambientTemp, targetTemp),
    [isOn, ambientTemp, targetTemp],
  )

  const { boxShadow, backgroundImage, statusColor, zoneNameColor, ambientTempColor, text } =
    stateStyles[state]

  return (
    <Link to={to} className="no-underline">
      <motion.div
        role="article"
        aria-label={`Zone ${zoneName}`}
        style={{ padding: "17px 13px", boxShadow }}
        className={`overflow-hidden flex flex-col grow-1 relative min-w-[130px] h-[130px] rounded-[10px] transition-all duration-700 ease-in-out`}
        initial={{ opacity: 0, boxShadow, backgroundImage }}
        animate={{
          opacity: 1,
          boxShadow,
          backgroundImage,
        }}
        exit={{ opacity: 0, boxShadow, backgroundImage }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="hover:bg-black/7 flex items-center justify-center cursor-pointer w-[55px] h-[55px] absolute top-0 right-0 opacity-40 hover:opacity-100 transition-opacity duration-200"
          onClick={ev => {
            ev.preventDefault()
            ev.stopPropagation()
            onToggle()
          }}
          aria-label="Toggle Power"
        >
          <PowerIcon />
        </button>
        <div className="flex grow justify-between items-center h-[24px] mb-2">
          <h2 className={`text-[33px] font-medium text-[${ambientTempColor}]`}>
            {ambientTemp ? `${ambientTemp}º` : "-"}
          </h2>
        </div>

        <div className="flex flex-col items-start text-[16px] font-medium">
          <p className={`leading-tight truncate text-[${zoneNameColor}]`}>{zoneName}</p>
          <p className={`text-[13px] truncate text-[${statusColor}] font-medium mt-1`}>
            {text(targetTemp)}
          </p>
        </div>
        {isOn && (
          <AnimatePresence mode="wait">
            {(state === "heating" || state === "cooling") && (
              <motion.div
                key={state} // this ensures exclusive transitions
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.3 },
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                }}
                className={styles.wrapper}
              >
                {state === "heating" ? <HeatIcon /> : <CoolIcon />}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </Link>
  )
}

export { ZoneButton }
