const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "2024-09-15",
    description: "The biggest tech conference of the year featuring industry leaders.",
    availableSeats: 50,
    totalSeats: 100,
    image: "https://picsum.photos/seed/tech/800/600"
  },
  {
    id: 2,
    title: "Music Festival",
    date: "2024-10-20",
    description: "A weekend of live music, food, and fun.",
    availableSeats: 120,
    totalSeats: 500,
    image: "https://picsum.photos/seed/music/800/600"
  },
  {
    id: 3,
    title: "Art Gallery Opening",
    date: "2024-11-05",
    description: "Exclusive viewing of modern art masterpieces.",
    availableSeats: 5,
    totalSeats: 30,
    image: "https://picsum.photos/seed/art/800/600"
  }
];

// Bookings store to prevent duplicates
// Format: { eventId: [email1, email2, ...] }
const bookings = {};

// Routes
app.get('/events', (req, res) => {
  // Simulate network delay for realistic loading state
  setTimeout(() => {
    res.json(events);
  }, 1000);
});

app.post('/book', (req, res) => {
  const { eventId, name, email } = req.body;

  if (!eventId || !name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const eventIndex = events.findIndex(e => e.id === parseInt(eventId));
  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const event = events[eventIndex];

  if (event.availableSeats <= 0) {
    return res.status(400).json({ message: "Sold out" });
  }

  // Check for duplicate booking
  if (!bookings[eventId]) {
    bookings[eventId] = [];
  }
  if (bookings[eventId].includes(email)) {
    return res.status(400).json({ message: "This email has already booked a seat for this event." });
  }

  // Process booking
  events[eventIndex].availableSeats -= 1;
  bookings[eventId].push(email);

  res.json({
    message: "Booking successful!",
    booking: {
      eventId,
      name,
      email,
      ticketId: Math.random().toString(36).substr(2, 9)
    },
    updatedEvent: events[eventIndex]
  });
});

app.post('/reset', (req, res) => {
  // Helper to reset data for testing
  events[0].availableSeats = 50;
  events[1].availableSeats = 120;
  events[2].availableSeats = 5;
  // Clear bookings
  for (const key in bookings) delete bookings[key];
  res.json({ message: "Data reset" });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
