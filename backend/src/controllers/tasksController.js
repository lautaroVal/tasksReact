const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = './src/data/tasks.json'

const tasksController = {
    list: (req, res) => {
        try {
             const tasks = JSON.parse(fs.readFileSync(path, 'utf-8'))
            
            return res.status(200).json({
				meta: {
					ok: true,
					status: 200
				},
				data: {
					totalTasks: tasks
				}
			})

		} catch (error) {
			console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message || 'Comuníquese con el administrador del sitio'
			})
		}
    },

    addTask:  (req, res) => {
        try {
           const { title,description,completed } = req.body
            const newTasks = {
                id: uuidv4(),
                title,
                description,
                completed: completed || false,
                createdAt: new Date()
            };

            const tasks = JSON.parse(fs.readFileSync(path, 'utf-8'))
            tasks.push(newTasks)
            fs.writeFileSync(path, JSON.stringify(tasks,null,2))
            
            return res.status(201).json({
				meta: {
					ok: true,
					status: 201
				},
				data: {
					totalTasks: tasks,
				}
			})

		} catch (error) {
			console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message || 'Comuníquese con el administrador del sitio'
			})
		}
        
    },
    updateTask: (req, res) => {
         try {
            const {id} = req.params
            const {title,description,completed} = req.body
            const tasks = JSON.parse(fs.readFileSync(path, 'utf-8'))
            
            const index = tasks.findIndex(task => task.id === id)

              if (index === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada'
            });
        }

            tasks[index] = {
                ...tasks[index],
                title: title ?? tasks[index].title,
                description: description ?? tasks[index].description,
                completed: typeof completed === 'boolean' ? completed : tasks[index].completed,
                updatedAt: new Date()
            }

            fs.writeFileSync(path, JSON.stringify(tasks,null,2))

            return res.status(200).json({
				meta: {
					ok: true,
					status: 200,
                    msg: 'Tarea actualizada',
				},
				data: {
					taskUpdated: tasks[index],
				}
			})

		} catch (error) {
			console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message || 'Comuníquese con el administrador del sitio'
			})
		}
    },
    removeTask: (req, res) => {
        try {
            const {id} = req.params
            const tasks = JSON.parse(fs.readFileSync(path, 'utf-8'))

            const taskExists = tasks.some(task => task.id === id);
            if (!taskExists) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Tarea no encontrada'
                });
            }

            const updatedTasks = tasks.filter(task => task.id !== id)
            
            fs.writeFileSync(path, JSON.stringify(updatedTasks,null,2))

            return res.status(200).json({
				meta: {
					ok: true,
					status: 200,
                    msg: 'Tarea eliminada',
				},
				data: {
					tasks: updatedTasks,
                    indexDeletedAt: id
				}
			})

		} catch (error) {
			console.log(error);
			return res.status(error.status || 500).json({
				ok: false,
				msg: error.message || 'Comuníquese con el administrador del sitio'
			})
		}
    }
}

module.exports = tasksController