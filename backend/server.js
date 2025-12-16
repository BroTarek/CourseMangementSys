const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Connect DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected".green.bold);
});

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"]
  }
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', async (data) => {
    // Save to DB
    const Message = require('./models/Message');
    try {
        await Message.create(data);
    } catch(e) { console.error('Error saving message', e); }
    
    // Broadcast to room
    socket.to(data.group).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});


// Routes
const studentRoutes = require('./routes/studentRoutes');
const communicationRoutes = require('./routes/communicationRoutes');
const integrationRoutes = require('./routes/integrationRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/integrations', integrationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
