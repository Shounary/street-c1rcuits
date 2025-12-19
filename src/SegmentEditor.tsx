import { TrackSegment, TrackSegmentInstance } from "./TrackSegment"
import { ParameterField } from "./ParameterField"


interface SegmentEditorProps {
  definition: TrackSegment
  segment: TrackSegmentInstance
  onChange: (name: string, value: number | string) => void
}

export function SegmentEditor({
  definition,
  segment,
  onChange
}: SegmentEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          {definition.displayName}
        </h2>
        <p className="text-sm opacity-70">
          Configure segment parameters
        </p>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        {definition.parameterSchema.map(param => (
          <ParameterField
            key={param.name}
            schema={param}
            value={segment.parameters[param.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}