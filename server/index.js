import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000', credentials: false }));
app.use(express.json());

// In-memory store
let tasks = [
  { id: nanoid(), title: 'Learn Next.js', completed: false },
  { id: nanoid(), title: 'Build an Express API', completed: true },
];

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Express API running' });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: nanoid(), title: title.trim(), completed: false };
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[idx].completed = !tasks[idx].completed;
  res.json(tasks[idx]);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
