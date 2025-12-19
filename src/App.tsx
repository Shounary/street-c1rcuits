import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { TrackSegment, TrackSegmentInstance } from "./TrackSegment";
import { SegmentPalette } from "./SegmentPalette";
import { SegmentEditor } from "./SegmentEditor";

const client = generateClient<Schema>();

async function fetchTrackSegments() {
  const { data: trackSegments } = await client.models.TrackSegment.list()
  const parsedSegments = trackSegments.map((seg: any) => {
    return {
        type: seg.type,
        displayName: seg.name,
        description: seg.metadata?.description ?? 'No description',
        defaultParameters: seg,
        parameterSchema: seg.parameterSchema.map(JSON.parse)
      }
  })
  // console.log(trackSegments)
  return parsedSegments
}

// const [draftSegment, setDraftSegment] =
//   useState<TrackSegmentInstance | null>(null)

// const updateDraftParameter = (
//   name: string,
//   value: number | string
// ) => {
//   setDraftSegment(prev =>
//     prev
//       ? {
//           ...prev,
//           parameters: {
//             ...prev.parameters,
//             [name]: value
//           }
//         }
//       : null
//   )
// }

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [trackSegments, setTrackSegments] = useState<TrackSegment[]>([]);
  const { user, signOut } = useAuthenticator();

  const [selectedSegment, setSelectedDefinition] = useState<TrackSegment | null>(null)

  const [draftSegment, setDraftSegment] = useState<TrackSegmentInstance | null>(null)

  
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
    const fetchData = async () => {
      const fetchedTrackSegments = await fetchTrackSegments();
      setTrackSegments(fetchedTrackSegments);
    };
    fetchData();
  }, []);


  function onSegmentSelect(segment: TrackSegment) {
    if (segment?.parameterSchema.length > 0) {
      console.log(segment?.parameterSchema[0])
    }
    setSelectedDefinition(segment)
    setDraftSegment(createDraftSegment(segment))
  }

  function createDraftSegment(def: TrackSegment): TrackSegmentInstance {
    return {
      id: crypto.randomUUID(),
      type: def.type,
      parameters: { ...def.defaultParameters }
    }
  }

  const updateDraftParameter = (
    name: string,
    value: number | string
  ) => {
    setDraftSegment(prev =>
      prev
        ? {
            ...prev,
            parameters: {
              ...prev.parameters,
              [name]: value
            }
          }
        : null
    )
  }

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content"), isDone: !!window.prompt("Todo isDone?")});
  }

  function deteleTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
          onClick={() => deteleTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>

      <h1>Track Segments</h1>
      {/* <ul>
        {trackSegments.map((trackSegment) => (
          <li key={trackSegment.id}>{trackSegment.name}</li>
        ))}
      </ul> */}



      {/* <div className="grid gap-3">
      {trackSegments.map(seg => (
        <button
          key={seg.type}
          // onClick={() => onSelect(seg)}
          className="rounded-xl border p-4 hover:bg-muted text-left"
        >
          <h3 className="font-semibold" color="white">{seg.displayName}</h3>
          <p className="text-sm opacity-70">{seg.description ?? 'null'}</p>
        </button>
      ))}
      </div> */}

      <SegmentPalette
        segments={trackSegments}
        onSelect={onSegmentSelect}
      />

      {/* <SegmentPreview segment={draftSegment} /> */}

      {draftSegment && selectedSegment && (
        <SegmentEditor
          segmentDef={selectedSegment}
          segmentInstance={draftSegment}
          onChange={updateDraftParameter}
        />
      )}



      <button style={{ margin: "10px" }} onClick={signOut}>Sign Out</button>
      

    </main>
  );
}

export default App;
