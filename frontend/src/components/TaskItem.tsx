import type { Tarea } from "../types"

type TaskItemProps  = {
    tarea: Tarea | null
    setTarea: React.Dispatch<React.SetStateAction<Tarea | null>>
    eliminarTarea: (id: string) => void
}

export default function TaskItem({ tarea, setTarea, eliminarTarea }: TaskItemProps ) {
        if (!tarea) return null;
        const { title, description, completed, id } = tarea;
    
    const handleEliminar = () => {
        const respuesta = confirm("¿Deseas eliminar esta tarea?")

        if (respuesta) {eliminarTarea(id)}
    }
    
    return (
        <div className={`mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl transition-colors duration-300 ${completed ? 'border-l-8 border-green-500' : ''}`}>
            <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre de Tarea: {" "}
                <span className="font-normal normal-case">{title}</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Descripción: {" "}
                <span className="font-normal normal-case">{description}</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">
                Completada: {""}
                <input
                    type="checkbox"
                    checked={completed}
                    readOnly 
                    aria-label="Estado de la tarea"
                />
            </p>

            <div className="flex justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setTarea(tarea)}
                >Editar
                </button>
                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleEliminar}
                >Eliminar
                </button>
            </div>
        </div>
    )
}
