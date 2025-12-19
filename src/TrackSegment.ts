type TrackSegmentType = "straight" | "arc" | "clothoid" | "compound";

export type TrackSegment = {
  type: TrackSegmentType;
  displayName: string;
  description?: string;
  defaultParameters: Record<string, number | string>;
  parameterSchema: {
    name: string;
    label: string;
    type: "number" | "select";
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
  }[];
}

export type TrackSegmentInstance = {
  id: string;
  type: TrackSegmentType;
  parameters: Record<string, number | string>;
}

