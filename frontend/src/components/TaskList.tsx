import TaskItem from "./TaskItem";
import type { Tarea } from "../types"

type TaskListProps  = {
  tareas: Tarea[]
  setTarea: React.Dispatch<React.SetStateAction<Tarea | null>>
  eliminarTarea: (id: string) => void
}

export default function TaskList({tareas, setTarea, eliminarTarea}: TaskListProps ) {
    //console.log(tareas);
    
  return (
      <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {tareas.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de Tareas
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold ">
              Tareas
            </span>
          </p>

          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              setTarea={setTarea}
              eliminarTarea={eliminarTarea}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Tareas</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando Tareas {""}
            <span className="text-indigo-600 font-bold ">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  )
}
