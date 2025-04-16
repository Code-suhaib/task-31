import React from "react";

export default function Filter({ predefinedTags, selectedTags, onTagChange }) {
  const handleTagChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedTags = options.map((o) => o.value);
    onTagChange(selectedTags); // Pass the selected tags back to the parent
  };

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor="filterTags">Filter by Tags</label>
      <select
        multiple
        id="filterTags"
        className="form-select"
        onChange={handleTagChange}
        value={selectedTags}
      >
        {predefinedTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
