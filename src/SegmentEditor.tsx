import { TrackSegment, TrackSegmentInstance } from "./TrackSegment"
import { ParameterField } from "./ParameterField"


interface SegmentEditorProps {
  segmentDef: TrackSegment
  segmentInstance: TrackSegmentInstance
  onChange: (name: string, value: number | string) => void
}

export function SegmentEditor({
  segmentDef,
  segmentInstance,
  onChange
}: SegmentEditorProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">
          {segmentDef.displayName}
        </h2>
        <p className="text-sm opacity-70">
          Configure segment parameters
        </p>
      </div>

      {/* Parameters */}
      <div className="space-y-4">
        {segmentDef.parameterSchema.map((param, index) => (
          <ParameterField
            key={index}
            schema={param}
            value={segmentInstance.parameters[param.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}