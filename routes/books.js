import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all books End Point
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
});

// GET book by ID End Point
router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

// POST create a book  End Point
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pool.query(
    'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
    [title, author, year]
  );
  res.status(201).json(result.rows[0]);
});

// PUT update a book End Point
router.put('/:id', async (req, res) => {
  const { title, author, year } = req.body;
  const result = await pool.query(
    'UPDATE books SET title=$1, author=$2, year=$3 WHERE id=$4 RETURNING *',
    [title, author, year, req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE a book End Point
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM books WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

export default router;
