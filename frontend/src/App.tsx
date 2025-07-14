import { useState, useEffect } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import type { Tarea, TareaRaw} from "./types"

const apiUrlBase =  import.meta.env.VITE_API_URL_BASE;

function parseTarea(t: TareaRaw): Tarea {
  return {
    ...t,
    createdAt: new Date(t.createdAt),
    updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
  };
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [tarea, setTarea] = useState<Tarea | null>(null)
    
  useEffect(() => {
    fetch(`${apiUrlBase}/api/tasks`)
    .then(response => response.json())
    .then(data => {
       const tareasParseadas = data.data.totalTasks.map(parseTarea);
      setTareas(tareasParseadas)})
    .catch(error => console.error("Error cargando tareas", error))
  }, [])

  const eliminarTarea = (id: string) => {
    try {
      fetch(`${apiUrlBase}/api/tasks/${id}`, {
        method: 'DELETE'
      })
      setTareas(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error("Error eliminando tarea: ", error);
    }
  }

  return (
    <div className="container mx-auto mt-20">

      <Header />

      <div className="mt-12 md:flex">
        <TaskForm
        tareas={tareas}
        setTareas={setTareas}
        tarea={tarea}
        setTarea={setTarea}
        />
        <TaskList
        tareas={tareas}
        setTarea={setTarea}
        eliminarTarea={eliminarTarea}
        />
      </div>

    </div>
  )

}

export default App
