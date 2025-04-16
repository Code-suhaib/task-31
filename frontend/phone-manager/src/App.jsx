import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [availableTags, setAvailableTags] = useState(["Family", "Friends", "Work", "Emergency"]);

  // Fetch contacts from backend or initialize with empty array
  useEffect(() => {
    const fetchContacts = async () => {
      // Make sure the backend URL is correct
      const response = await fetch("http://localhost:5000/contacts");
      const data = await response.json();
      setContacts(data); // Populate the contacts state
    };
    fetchContacts();
  }, []);  // Empty dependency array to run only once on mount

  // Handle adding a new contact
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
      setContacts((prevContacts) => [...prevContacts, addedContact]); // Add to the current contacts list
    }
  };

  // Handle deleting a contact
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/contacts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id));
    }
  };

  // Handle updating a contact
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

  return (
    <div className="container">
      <h1 className="my-4">Contact Manager</h1>
      <ContactForm onSubmit={handleAddContact} />
      <ContactList
        contacts={contacts}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        availableTags={availableTags}
      />
    </div>
  );
}
