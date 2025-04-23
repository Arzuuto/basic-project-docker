import { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const getTodo = async () => {
      await fetch(import.meta.env.VITE_BACKEND_URI + "/todo", {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => setTodos(data))
    }
    getTodo()
    console.log(import.meta.env.VITE_BACKEND_URI + "/todo")
  }, [])


  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: Todo = { title, description, completed}

    const res = await fetch(import.meta.env.VITE_BACKEND_URI + "/todo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })

    if (res.ok) {
      setTodos((prev) => [...prev || [], newTodo])
      setTitle('')
      setDescription('')
      setCompleted(false)
    } else {
      alert("fail");
    }
  };

  return (
    <div className="flex content-center justify-center items-center flex-col bg-red-200 gap-20 min-h-screen p-8">
      <h1 className="text-center text-6xl font-bold mt-20">Todo App</h1>

      <form onSubmit={createTodo} className="flex flex-col gap-4 w-full max-w-md">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded px-4 py-2">
          Create
        </button>
      </form>

      <ul className="w-full max-w-md space-y-2">
        {todos?.map((todo, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <strong>{todo.title}</strong> - {todo.description}
            {todo.completed && <span className="text-green-600 ml-2">(Done)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
