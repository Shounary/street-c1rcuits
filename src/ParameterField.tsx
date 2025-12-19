



type ParamType = "number" | "select"

interface ParameterSchema {
  name: string
  label: string
  type: ParamType
  min?: number
  max?: number
  step?: number
  options?: string[]
}


export function ParameterField({
  schema,
  value,
  onChange
}: {
  schema: ParameterSchema
  value: number | string
  onChange: (name: string, value: number | string) => void
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {schema.label}
      </label>

      {schema.type === "number" && (
        <input
          type="number"
          value={value as number}
          min={schema.min}
          max={schema.max}
          step={schema.step}
          onChange={e =>
            onChange(schema.name, Number(e.target.value))
          }
          className="w-full rounded-lg border bg-transparent p-2"
        />
      )}

      {schema.type === "select" && (
        <select
          value={value as string}
          onChange={e =>
            onChange(schema.name, e.target.value)
          }
          className="w-full rounded-lg border bg-transparent p-2"
        >
          {schema.options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}