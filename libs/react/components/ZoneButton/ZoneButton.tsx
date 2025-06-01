import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom"
import { CoolIcon, HeatIcon, PowerIcon } from "@az/assets"
import { stateStyles } from "./ZoneButton.styles"
import { ZoneButtonIcon } from "./ZoneButtonIcon"

type ZoneButtonProps = {
  zoneName: string
  ambientTemp: number
  targetTemp: number
  isOn: boolean
  onToggle: () => void
  to: string
  size?: "small" | "large"
}

const getState = (isOn: boolean, ambient: number, target: number) => {
  if (!isOn) return "off"
  if (ambient < target) return "heating"
  if (ambient > target) return "cooling"
  return "comfort"
}

const ZoneButton = ({
  zoneName,
  ambientTemp,
  targetTemp,
  isOn,
  to,
  size,
  onToggle,
}: ZoneButtonProps) => {
  const width = size === "large" ? "w-[500px]" : "w-[130px]"
  const state = useMemo(
    () => getState(isOn, ambientTemp, targetTemp),
    [isOn, ambientTemp, targetTemp],
  )

  return (
    <Link to={to} className="no-underline">
      <motion.div
        role="article"
        aria-label={`Zone ${zoneName}`}
        className={`relative ${width} h-[130px] rounded-[10px] p-4 transition-all duration-700 ease-in-out ${stateStyles[state]}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center h-[24px] mb-2">
          <h2 className="text-[16px] font-medium text-[#1F2933] truncate w-[85%]">{zoneName}</h2>
          <button
            className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-200"
            onClick={ev => {
              ev.preventDefault()
              ev.stopPropagation()
              onToggle()
            }}
            aria-label="Toggle Power"
          >
            <PowerIcon />
          </button>
        </div>

        <div className="flex flex-col items-start text-[13px] font-medium text-[#9AA5B1]">
          <p className="leading-tight">
            {state === "heating"
              ? `Heating to ${targetTemp}º`
              : state === "cooling"
                ? `Cooling to ${targetTemp}º`
                : state === "comfort"
                  ? "Comfort"
                  : "OFF"}
          </p>
          <p className="text-[16px] text-[#1F2933] font-medium mt-1">{ambientTemp}º</p>
        </div>
        {isOn && (
          <AnimatePresence mode="wait">
            {state === "heating" && (
              <ZoneButtonIcon label="heat">
                <HeatIcon />
              </ZoneButtonIcon>
            )}
            {state === "cooling" && (
              <ZoneButtonIcon label="cool">
                <CoolIcon />
              </ZoneButtonIcon>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </Link>
  )
}

export { ZoneButton }
