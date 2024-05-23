class Product {
  constructor(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

let products = []; // Array para almacenar productos en memoria

exports.createProduct = (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product(products.length + 1, name, price, description);
  products.push(newProduct);
  res.status(201).send(newProduct);
};

exports.getProducts = (req, res) => {
  res.status(200).send(products);
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const product = products.find(p => p.id == id);
  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  product.name = name;
  product.price = price;
  product.description = description;
  res.send(product);
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id == id);
  if (index === -1) {
    return res.status(404).send({ message: 'Product not found' });
  }
  products.splice(index, 1);
  res.send({ message: 'Product deleted' });
};

