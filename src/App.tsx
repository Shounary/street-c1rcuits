import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [trackSegments, ] = useState<Array<Schema["TrackSegment"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  
  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

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
      <ul>
        {trackSegments.map((trackSegment) => (
          <li key={trackSegment.id}>{[trackSegment.name, trackSegment.shape]}</li>
        ))}
      </ul>
      <button onClick={ signOut }>Sign Out</button>
    </main>
  );
}

export default App;
