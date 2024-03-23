import Todo from '../models/todo.model.js';

export default class TodoController {
    static listAllTodos = async (req, res) => {
        try {
          const todos = await Todo.findAll();
          res.status(200).json({
            data: todos
        })
        } catch(err) {
            throw err
        }
    }
    
    static detailTodo = async (req, res) => {
        try {
          const todo = await Todo.findByPk(req.params.id);
          res.status(200).json(todo)
        } catch(err) {
            throw err
        }
    }

    static createTodo = async (req, res) => {
        try {
            const todo = await Todo.create(req.body);
            res.status(200).json(todo)
        } catch(err) {
            throw err
        }
    }

    static deleteTodo = async (req, res) => {
        try {
            const whereOption = {where: {id: parseInt(req.params.id)}};
          const todo = await Todo.destroy(whereOption);
          res.json(todo)
        } catch(err) {
            throw err
        }
    }
}