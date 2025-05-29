// Load environment variables first
require('dotenv').config({ path: './.env' });
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI from env:', process.env.MONGODB_URI);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

// Import database connection
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect to MongoDB first
connectDB()
  .then(() => {
    // Only import routes after successful DB connection
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');
    const skillRoutes = require('./routes/skillRoutes');
    const sessionRoutes = require('./routes/sessionRoutes');
    const reviewRoutes = require('./routes/reviewRoutes');
    const messageRoutes = require('./routes/messageRoutes');
    
    // Create Express app
    const app = express();
    const server = http.createServer(app);
    
    // Socket.io setup
    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Middleware
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Static files
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // API Routes
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/sessions', sessionRoutes);
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/messages', messageRoutes);

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      // Set static folder
      app.use(express.static(path.join(__dirname, '../frontend/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
      });
    }

    // Root route
    app.get('/', (req, res) => {
      res.send('SkillSwap API is running...');
    });

    // Socket.io connection handling
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      // Join a room (for private chats)
      socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
      });

      // Handle chat messages
      socket.on('send_message', (data) => {
        io.to(data.roomId).emit('receive_message', data);
      });

      // Handle session status updates
      socket.on('update_session_status', (data) => {
        io.to(data.roomId).emit('session_status_updated', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    // Create necessary directories if they don't exist
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // Error handler middleware
    app.use(errorHandler);

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', err);
      // Close server & exit process
      server.close(() => process.exit(1));
    });

    // Start server
    const PORT = process.env.PORT || 5004;
    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  });
