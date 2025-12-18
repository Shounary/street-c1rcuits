import { TrackSegment, TrackSegmentInstance } from "./TrackSegment"

interface EditorState {
  selectedDefinition: TrackSegment | null
  draftSegment: TrackSegmentInstance | null
}