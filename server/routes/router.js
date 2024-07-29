import {Router} from "express";

const createRouter = (db) => {
const router = Router();

router.get('/tasks', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM tasks');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
    }
});

router.post('/tasks', async (req, res) => {
  try {
    const { title, content, days } = req.body;
    const result = await db.query(
      'INSERT INTO tasks (title, content, days) VALUES ($1, $2, $3) RETURNING *',
      [title, content, days]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      console.error(err.message);
    }
  });
  
router.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const setString = Object.keys(updates).map((key, index) => 
    `${key} = $${index + 1}`).join(', ');
    
    const values = Object.values(updates);

    const result = await db.query(
      `UPDATE tasks SET ${setString} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({error: 'Task not found'});
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error'});
  }
});

  return router;

};

export default createRouter;
