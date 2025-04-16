import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [availableTags, setAvailableTags] = useState(["Family", "Friends", "Work", "Emergency"]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch("http://localhost:5000/contacts");
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    const response = await fetch("http://localhost:5000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });

    if (response.ok) {
      const addedContact = await response.json();
      setContacts((prevContacts) => [...prevContacts, addedContact]);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/contacts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    }
  };

  const handleUpdate = async (id, updatedContact) => {
    const response = await fetch(`http://localhost:5000/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    });

    if (response.ok) {
      const updatedData = await response.json();
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === id ? updatedData : contact
        )
      );
    }
  };

  // 🔍 Filter contacts based on selected tag
  const filteredContacts =
  selectedTag === "All"
    ? contacts
    : contacts.filter((contact) => contact.tags?.includes(selectedTag));


  return (
    <div className="min-vh-100 py-5" style={{ 
      background: "linear-gradient(to right, #667eea, #764ba2)", 
      color: "#fff" 
    }}>
    <div className="container">
      <h1 className="my-4">Contact Manager</h1>

      {/* 🔽 Filter Dropdown */}
      <div className="mb-3">
        <label htmlFor="tagFilter" className="form-label">Filter by Tag:</label>
        <select
          id="tagFilter"
          className="form-select"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="All">All</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <ContactForm onSubmit={handleAddContact} />
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        availableTags={availableTags}
      />
    </div>
    </div>
  );
}
