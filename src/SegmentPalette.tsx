import {
  Minus,
  Circle,
  Shuffle,
  Layers
} from "lucide-react"

import type { TrackSegment } from "./TrackSegment"

const icons = {
  straight: Minus,
  arc: Circle,
  clothoid: Shuffle,
  compound: Layers
}

const colors = {
  straight:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  arc:
    "bg-sky-500/10 text-sky-400 border-sky-500/20",
  clothoid:
    "bg-amber-500/10 text-amber-400 border-amber-500/20",
  compound:
    "bg-violet-500/10 text-violet-400 border-violet-500/20"
}

export function SegmentPalette({ segments, selected, onSelect }: {
    segments: TrackSegment[],
    selected?: TrackSegment,
    onSelect: (segment: TrackSegment) => void
}) {
  return (
    <div className="grid gap-3">
      {segments.map(segment => {
        const Icon = icons[segment.type]
        const isSelected = selected?.type === segment.type

        return (
          <button style={{ margin: "10px" }}
            key={segment.type}
            type="button"
            onClick={() => onSelect(segment)}
            className={[
              "w-full text-left rounded-xl border p-4",
              "transition-all duration-150",
              "hover:scale-[1.02] hover:shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              colors[segment.type],
              isSelected && "ring-2 ring-primary"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex items-start gap-4">
              <Icon className="h-5 w-5 mt-1 shrink-0" />

              <div className="space-y-1">
                <div className="font-semibold leading-none">
                  {segment.displayName}
                </div>

                {/* <p className="text-xs opacity-70 max-w-[220px]">
                  {segment.description}
                </p> */}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}