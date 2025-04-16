const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/contactsApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Database connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
  

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  tags: [String],
  userId: String, // For multi-user support
});

const Contact = mongoose.model("Contact", contactSchema);

// POST /contacts
app.post("/contacts", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).send(contact);
});

// GET /contacts/:user_id
app.get("/contacts/:user_id", async (req, res) => {
  const contacts = await Contact.find({ userId: req.params.user_id });
  res.send(contacts);
});

// PUT /contacts/:id
app.put("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(contact);
});

// DELETE /contacts/:id
app.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

// GET /tags
app.get("/tags", async (req, res) => {
  const contacts = await Contact.find();
  const allTags = [...new Set(contacts.flatMap((c) => c.tags))];
  res.send(allTags);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
