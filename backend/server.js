require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());

// Database Connection
const uri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;
const client = new MongoClient(uri);
let database;

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    database = client.db('Ecom');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
}

connectDB();

// Middleware to Verify JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const collection = database.collection('login');
    const existingUser = await collection.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await collection.insertOne({ username, password: hashedPassword });

    res.json({ message: '✅ User registered successfully' });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login with JWT
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const collection = database.collection('login');
    const user = await collection.findOne({ username });

    if (!user) return res.status(401).json({ error: '❌ Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: '❌ Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.json({ message: '✅ Login successful', token, user: { username: user.username } });
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch All Products (Public)
app.get('/api/products', async (req, res) => {
  try {
    const collection = database.collection('products');
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, brand, image } = req.body;

    if (!name || !price || !category || !brand || !image) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const product = { name, price, category, brand, image };
    const collection = database.collection('products');

    await collection.insertOne(product);
    
    res.status(201).json({ message: '✅ Product added successfully!' });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const collection = database.collection('products');
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
          return res.status(404).json({ message: '❌ Product not found!' });
      }

      res.json({ message: '✅ Product deleted successfully!' });
  } catch (error) {
      console.error('❌ Error deleting product:', error); // Log the error
      res.status(500).json({ message: 'Internal server error' });
  }
});

//Update Product

// Get Single Product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID!" });
    }

    const product = await database.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Product API
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, brand, image } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID!" });
    }

    const result = await database.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price, category, brand, image } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json({ message: "✅ Product updated successfully!" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a Product (Protected)
app.post('/api/cart/add', async (req, res) => {
  try {
    const { productId, name, image, price, quantity } = req.body;
    const collection = database.collection('cart');

    const existingItem = await collection.findOne({ productId });

    if (existingItem) {
      // Corrected $inc usage
      await collection.updateOne(
        { productId },
        { $inc: { quantity: quantity } }  // Proper increment
      );
    } else {
      await collection.insertOne({ productId, name, image, price, quantity });
    }

    res.json({ message: '✅ Item added to cart successfully!' });
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add Item to Cart (Protected)
app.post('/api/cart/add', async (req, res) => {
  try {
    const { productId, name, image, price, quantity } = req.body;
    const collection = database.collection('cart');

    
    const existingItem = await collection.findOne({ productId });

    if (existingItem) {
      
      await collection.updateOne(
        { productId },
        { $inc: { quantity } }
      );
    } else {
      
      await collection.insertOne({ productId, name, image, price, quantity });
    }

    res.json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/api/cart', async (req, res) => {
  try {
    const collection = database.collection('cart');
    const cartItems = await collection.find().toArray();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/cart/update', async (req, res) => {
  try {
    const { id, quantity } = req.body;
    if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

    const collection = database.collection('cart');
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity } }
    );

    res.json({ message: 'Cart item updated' });
  } catch (error) {
    console.error('❌ Error updating cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/cart/remove/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const collection = database.collection('cart');
    await collection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('❌ Error removing cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.delete('/api/cart/clear', async (req, res) => {
  try {
    const collection = database.collection('cart');
    await collection.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('❌ Error clearing cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add Address to Database
app.post('/api/address', async (req, res) => {
  try {
    const { name, phone, street, city, state, zip } = req.body;

    // Validate input
    if (!name || !phone || !street || !city || !state || !zip) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const collection = database.collection('address'); // Use address collection
    const newAddress = { name, phone, street, city, state, zip, createdAt: new Date() };

    const result = await collection.insertOne(newAddress);

    res.status(201).json({ message: '✅ Address saved successfully', data: result });
  } catch (error) {
    console.error('❌ Error saving address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});