import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      setError('Could not load tasks. Is the Express server running on port 4000?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (res.ok) {
      const newTask = await res.json();
      setTasks(prev => [newTask, ...prev]);
      setTitle('');
    }
  }

  async function toggleTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PATCH' });
    if (res.ok) {
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    }
  }

  async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    if (res.status === 204) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <span className="badge">Next.js + Express (In‑Memory)</span>
      </header>

      <div className="card">
        <form onSubmit={addTask} className="row">
          <input
            className="input"
            placeholder="Add a new task…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn" type="submit">Add</button>
        </form>

        {loading ? <p className="small">Loading…</p> : null}
        {error ? <p className="small" style={{color:'crimson'}}>{error}</p> : null}

        <ul className="list">
          {tasks.map(t => (
            <li key={t.id} className="item">
              <div>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>{t.title}</span>
              </div>
              <div className="actions">
                <button className="btn" onClick={() => toggleTask(t.id)}>{t.completed ? 'Undo' : 'Done'}</button>
                <button className="btn" onClick={() => deleteTask(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="small">Tip: Restarting the server will reset tasks (in‑memory store).</p>
    </div>
  );
}
