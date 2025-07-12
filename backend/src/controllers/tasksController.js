const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const tasksController = {
    list: (req, res) => {
        try {
            let tasks = fs.readFileSync('./src/data/tasks.json', 'utf-8');
            let tasksJSON = JSON.parse(tasks);
            
            return res.status(200).json({
				meta: {
					ok: true,
					status: 200
				},
				data: {
					totalTasks: tasksJSON
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

            const tasks = JSON.parse(fs.readFileSync('./src/data/tasks.json', 'utf-8'))
            tasks.push(newTasks)
            fs.writeFileSync('./src/data/tasks.json',JSON.stringify(tasks,null,2))
            
            return res.status(200).json({
				meta: {
					ok: true,
					status: 200
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
        
    },
    removeTask: (req, res) => {
        
    }
}

module.exports = tasksController