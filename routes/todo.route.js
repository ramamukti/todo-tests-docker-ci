import express from 'express';
import TodoController from "../controllers/todo.controller.js";

const router = express.Router();

router.get('/', TodoController.listAllTodos);
router.get('/:id', TodoController.detailTodo);
router.post('/', TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);

export default router;