const Task = require("../models/Task.js");

const taskController = {
    createTask: async (req, res) => {
        try {
            const task = await Task.create(req.body);
            res.status(201).send(task);
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to create the task"});
        }
    },
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find();
            res.status(201).send(tasks);
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to get all tasks"});
        }
    },
    getTaskById: async (req, res) => {
        const id = req.params.id;
        try {
            const task = await Task.findById(id);
            if (!task) {
                res.status(404).send({message: "There is no task with that id"});
            }
            res.status(201).send(task);
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to get the task"});
        }
    },
    markAsComplete: async (req, res) => {
        const id = req.params.id;
        try {
            const task = await Task.findByIdAndUpdate(id, {completed: true});
            if (!task) {
                res.status(404).send({message: "There is no task with that id"});
            }
            const updatedTask = await Task.findById(id);
            res.status(201).send(updatedTask);
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to update the task"});
        }
    },
    updateTask: async (req, res) => {
        const id = req.params.id;
        const newTitle = req.body.title;
        if (!newTitle) {
            res.status(400).send({message: "El título tiene que ser válido"});
        }
        try {
            const task = await Task.findByIdAndUpdate(id, {title: newTitle});
            if (!task) {
                res.status(404).send({message: "There is no task with that id"});
            }
            const updatedTask = await Task.findById(id);
            res.status(201).send(updatedTask);
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to update the task"});
        }
    },
    deleteTask: async (req, res) => {
        const id = req.params.id;
        try {
            const task = await Task.findById(id);
            if (!task) {
                res.status(404).send({message: "There is no task with that id"});
            }
            const deleteCount = await Task.deleteOne({_id: id});
            res.status(201).send({message: "Task successfully deleted", deleteCount: deleteCount});
        } catch (error) {
            console.log(error);
            res.status(501).send({message: "There was a problem trying to delete the task"});
        }
    },
};

module.exports = taskController;