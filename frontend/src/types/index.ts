export type Tarea = { 
  id: string,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  updatedAt?: Date
}

export type TareaRaw = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string | number,
  updatedAt?: string | number
} 

