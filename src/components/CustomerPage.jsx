import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styling/CustomerPage.css';
import logo from '../images/kdlogo.jpg';

const CustomerPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem('kdChatsMenu')) || [];
    setMenuItems(savedMenu);
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <div className="customer-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><a href="#welcome">Welcome</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#address">Address</a></li>
        </ul>
      </nav>

      {/* Welcome Section */}
      <motion.section 
        id="welcome" 
        className="parallax-section welcome-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="overlay"></div>
        <div className="content-wrapper">
          <img src={logo} alt="" style={{ borderRadius: '50%' }} />
          <h1 className="extra-large">KD CHATS</h1>
          <h1 className="large-text">Welcome to KD Chats</h1>
          <p className="subtitle">Best street food in town, serving a wide variety of chats and snacks.</p>
          <button className="glow-btn top-btn" onClick={() => setShowModal(true)}> Look At Available Items</button>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about" 
        className="parallax-section about-us-section"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="overlay"></div>
        <div className="content-wrapper">
          <h2>About Us</h2>
          <p>
            At KD Chats, we believe in serving food made with love. Our extensive menu has something for everyone.
            <p>
              Over the years, our dedication to quality, flavor, and customer satisfaction
              has helped us grow into one of the most beloved street food spots in the city.
            </p>
          </p>
          <p>We believe in serving food made with love, using fresh ingredients and traditional recipes passed down
            through generations. Whether you’re craving a quick snack or a hearty meal, our extensive menu has something
            for everyone.</p>
          <button className="glow-btn bottom-btn" onClick={() => setShowModal(true)}>Available Items At The Moment</button>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="parallax-section contact-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="overlay"></div>
        <div className="content-wrapper">
          <h2>Contact Us</h2>
          <p>Book your order now: +91 9491106766</p>
          <button className="glow-btn bottom-right-btn" onClick={() => setShowModal(true)}> Items Open For Ordering</button>
        </div>
      </motion.section>

      {/* Address Section */}
      <motion.section 
        id="address" 
        className="parallax-section address-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="overlay"></div>
        <div className="content-wrapper">
          <h2>Our Address</h2>
          <div className="map-container">
            <iframe className='iframe'
              title="Google Maps Location"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.264884105529!2d78.79338047582397!3d13.65304348984462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb446f7c70bc005%3A0x5e31e27aabce7169!2sNational%20Highway%20205%2C%20Kalikiri%2C%20Andhra%20Pradesh%20517234!5e0!3m2!1sen!2sin!4v1696264814145!5m2!1sen!2sin`}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p>Indiramma Colony, <br />National Highway 71,beside Mohammed car painting and water service, <br />Kalikiri, Andhra Pradesh, INDIA, 517234</p>
          <button className="glow-btn middle-btn" onClick={() => setShowModal(true)}>Items They Can Serve Now</button>
        </div>
      </motion.section>

      {/* Modal for Available Items */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>X</button>
            <h3 className="modal-title">Available Items</h3>
            <ul>
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <p>No items available at this time.</p>
              )}
            </ul>
            <h4 className="modal-subtitle">Booking Conditions</h4>
            <p>
              - If the order is less than ₹100, a delivery charge of ₹2 per km applies.<br />
              - If the order is more than ₹100, a delivery charge of ₹1 per km applies.<br />
              - If the order is more than ₹500, you get ₹50 worth of food for free!<br />
            </p>
            <p className="modal-footer">
              For ordering, please call the store owner. He will update you on your order's status. Thank you!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
