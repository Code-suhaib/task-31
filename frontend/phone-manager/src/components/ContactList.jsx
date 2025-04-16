import React, { useState } from "react";

export default function ContactList({ contacts, onDelete, onUpdate, availableTags }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "", email: "", tags: [] });

  const handleEditClick = (contact) => {
    setEditingId(contact._id);
    setEditForm(contact);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    setEditForm({ ...editForm, tags: selectedTags });
  };

  const handleUpdate = () => {
    onUpdate(editingId, editForm);
    setEditingId(null);  // Close the editing form after update
  };

  return (
    <div className="mt-6">
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        contacts.map((contact) => (
          <div key={contact._id} className="card mb-3 shadow-sm border rounded">
            <div className="card-body">
              {editingId === contact._id ? (
                <div className="d-flex flex-column">
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Name"
                  />
                  <input
                    name="phone"
                    value={editForm.phone}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Phone"
                  />
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Email"
                  />
                  <select
                    multiple
                    value={editForm.tags}
                    onChange={handleTagChange}
                    className="form-control mb-2"
                  >
                    {availableTags.map((tag) => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <button onClick={handleUpdate} className="btn btn-success mb-2">
                    Save
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column">
                  <p className="fw-bold">Name:</p>
                  <p>{contact.name}</p>
                  <p className="fw-bold">Phone:</p>
                  <p>{contact.phone}</p>
                  <p className="fw-bold">Email:</p>
                  <p>{contact.email}</p>
                  <p className="fw-bold">Tags:</p>
                  <p>{contact.tags.join(", ")}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleEditClick(contact)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contact._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
