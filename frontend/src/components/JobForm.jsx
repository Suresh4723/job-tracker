// src/components/JobForm.jsx
import { useState, useEffect } from "react";

export default function JobForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ company: "", position: "", status: "pending" });

  useEffect(() => {
    if (initial) {
      setForm({
        company: initial.company,
        position: initial.position,
        status: initial.status,
      });
    } else {
      setForm({ company: "", position: "", status: "pending" });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initial) {
      onSubmit(initial._id, form);
    } else {
      onSubmit(form.company, form.position);
    }
    setForm({ company: "", position: "", status: "pending" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-5 md:items-center"
    >
      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company"
        required
        className="input md:w-1/3"
      />
      <input
        name="position"
        value={form.position}
        onChange={handleChange}
        placeholder="Position"
        required
        className="input md:w-1/3"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input md:w-1/6"
      >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="declined">Declined</option>
      </select>
      <button
        type="submit"
        className="btn-primary md:w-1/6"
      >
        {initial ? "Update" : "Add Job"}
      </button>
      {initial && (
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary md:w-1/6"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
