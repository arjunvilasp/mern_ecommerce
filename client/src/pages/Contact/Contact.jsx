import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have a question about our
        products, need assistance with an order, or just want to share your
        feedback, feel free to get in touch with us.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <section className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: support@zenox.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Zenox Street, Fashion City, FC 12345</p>
      </section>
    </div>
  );
};

export default Contact;
