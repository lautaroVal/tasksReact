import { useState, useEffect } from "react"
import type { Tarea, TareaRaw } from "../types"

const apiUrlBase =  import.meta.env.VITE_API_URL_BASE;

function parseTarea(t: TareaRaw): Tarea {
  return {
    ...t,
    createdAt: new Date(t.createdAt),
    updatedAt: t.updatedAt ? new Date(t.updatedAt) : undefined,
  };
}

type TaskFormProps = {
  tareas: Tarea[]
  setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>
  tarea: Tarea | null
  setTarea: React.Dispatch<React.SetStateAction<Tarea | null>>
}

export default function TaskForm({ setTareas, tarea, setTarea } : TaskFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (tarea) {
            setTitle(tarea.title)
            setDescription(tarea.description)
            setCompleted(tarea.completed)
        }
    }, [tarea])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {                    
        e.preventDefault()

        if ([title, description].includes("")) {
            alert("Todos los campos son obligatorios")
            return
        }

        const nuevaTarea = { title, description, completed }

        try {
            if (tarea?.id) {
                const response = await fetch(`${apiUrlBase}/api/tasks/${tarea.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevaTarea),
                })
                const data = await response.json()
                const tareaFormateada = parseTarea(data.data.taskUpdated)

                setTareas(tareas => tareas.map(t => t.id === tareaFormateada.id ? tareaFormateada  : t))
                setTarea(null)
            } else {
                const response = await fetch(`${apiUrlBase}/api/tasks`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevaTarea),
                })
                     const data = await response.json()
                      const tareaFormateada = parseTarea(data.data.totalTasks.at(-1)!)
                     setTareas(tareas => [...tareas, tareaFormateada])
            }

            setTitle("")
            setDescription("")
            setCompleted(false)
        } catch (error) {
            console.error("Error al guardar tarea: ", error)
        }

    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">

            <h2 className="font-black text-3xl text-center">Formulario para crear/editar tareas</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Tareas y {""}
                <span className="text-indigo-600 font-bold text-lg">Editalas</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                 onSubmit={handleSubmit}
                >

                <div className="mb-5">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 uppercase font-bold"
                    >Nombre de Tarea
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Nombre de la tarea"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Descripción
                    </label>

                    <textarea
                        id="description"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe tu tarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-5 flex items-center gap-3">
                    <label
                        htmlFor="completed"
                        className="block text-gray-700 uppercase font-bold"
                    >Completada
                    </label>
                    <input
                        type="checkbox"
                        id="completed"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={ tarea?.id ? 'Editar Tarea' : 'Agregar Tarea'}
                />

            </form>
        </div>
    )
}
