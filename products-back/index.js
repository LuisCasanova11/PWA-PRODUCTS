const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const webPush = require('web-push');
const app = express();

app.use(cors());
app.use(express.json());

const vapidKeys = {
  publicKey: 'BGm5bKOxOF91wRWsXQrUd9J9C8j7OJn03nrtqW3iL8gJo44bPdOCzxajr1DCDVDyTMQzh3LUQCK-qb4e7N-Hveg',
  privateKey: 'IxRsnISpCehG2pes2Ef-I03SVJEFGyUxRgQ6eCAlcSM'
};

webPush.setVapidDetails(
  'mailto:luiscc1106@icloud.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

const sendNotification = (data) => {
  subscriptions.forEach(subscription => {
    webPush.sendNotification(subscription, JSON.stringify(data))
      .catch(err => console.error("Error al enviar la notificación:", err));
  });
};

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
  sendNotification({ title: 'Nuevo producto agregado', body: `Se ha agregado ${newProduct.name}` });
  res.json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(product => product.id == id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    sendNotification({ title: 'Producto editado', body: `${products[index].name} ha sido actualizado` });
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(product => product.id != id);
  sendNotification({ title: 'Producto eliminado', body: `Se ha eliminado el producto con ID ${id}` });
  res.json({ message: 'Product deleted' });
});

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

const options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.cert')
};

const PORT = 5000;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on https://localhost:${PORT}`);
});

