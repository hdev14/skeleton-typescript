import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({message: 'Skelleton node-ts'});
})
app.listen(4444, () => {
  console.log('Server is running!');
});