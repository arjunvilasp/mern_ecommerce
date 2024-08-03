import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Zenox</h1>
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Welcome to Zenox, your number one source for all things fashion. We're dedicated to providing you the very best of apparel, with an emphasis on quality, customer service, and uniqueness.
        </p>
        <p>
          Founded in 2024 by [Founder's Name], Zenox has come a long way from its beginnings. When [Founder's Name] first started out, their passion for eco-friendly and ethically sourced fashion drove them to start their own business.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Zenox, our mission is simple: to make fashion accessible and enjoyable for everyone. We believe in providing a wide range of styles that cater to different tastes and preferences, ensuring that our customers can find something they love.
        </p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of high-quality products</li>
          <li>Affordable prices</li>
          <li>Excellent customer service</li>
          <li>Eco-friendly and ethically sourced materials</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          We love hearing from our customers! If you have any questions or feedback, feel free to reach out to us at:
        </p>
        <p>Email: support@zenox.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
};

export default About;
