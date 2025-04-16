import React, { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", tags: [] });

  const predefinedTags = ["Family", "Friends", "Work", "Emergency"]; // Predefined tags

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedTags = options.map((o) => o.value);
    setForm({ ...form, tags: selectedTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Call onSubmit with the form data
    setForm({ name: "", phone: "", email: "", tags: [] }); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg bg-white max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Contact</h2>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="tags">Tags</label>
        <select
          multiple
          onChange={handleTagChange}
          className="form-select"
          id="tags"
          value={form.tags} // Bind the selected tags to the form state
        >
          {predefinedTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Add Contact
      </button>
    </form>
  );
}
