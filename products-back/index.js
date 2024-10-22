const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, code: 'P001', name: 'Blue Band', price: 100, category: 'Fitness', rating: 4.5, inventoryStatus: 'INSTOCK' },
  { id: 2, code: 'P002', name: 'Teal T-Shirt', price: 200, category: 'Clothing', rating: 3.8, inventoryStatus: 'OUTOFSTOCK' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(product => product.id == id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(product => product.id != id);
  res.json({ message: 'Product deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

