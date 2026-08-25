import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`i'm UP..`);
});

let TODOS = [
  { id: 1, task: "Task 1", completed: false },
  { id: 2, task: "Task 2", completed: true },
];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(TODOS);
});

// GET single todo by id
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = TODOS.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

// CREATE a new todo
app.post("/todos", (req, res) => {
  const { task, completed } = req.body;

  if (!task || typeof task !== "string") {
    return res.status(400).json({ message: "Task is required and must be a string" });
  }

  const newTodo = {
    id: TODOS.length ? Math.max(...TODOS.map((t) => t.id)) + 1 : 1,
    task,
    completed: completed ?? false,
  };

  TODOS.push(newTodo);
  res.status(201).json({ message: "Todo added successfully", todo: newTodo });
});

// UPDATE a todo (full update)
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todoIndex = TODOS.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (!task || typeof task !== "string") {
    return res.status(400).json({ message: "Task is required and must be a string" });
  }

  TODOS[todoIndex] = {
    ...TODOS[todoIndex],
    task,
    completed: completed ?? TODOS[todoIndex].completed,
  };

  res.json({ message: "Todo updated successfully", todo: TODOS[todoIndex] });
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = TODOS.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deletedTodo = TODOS[todoIndex];
  TODOS.splice(todoIndex, 1);
  res.json({ message: "Todo deleted successfully", todo: deletedTodo });
});

const PORT = 5111;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})