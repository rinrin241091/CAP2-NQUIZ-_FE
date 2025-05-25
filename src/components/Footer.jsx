import React from "react";
import "../assets/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Discord Join Section */}
        <div className="discord-section">
          <img
            src="https://s3.ap-southeast-2.amazonaws.com/relux.cloude.com/7611fc8dd1a664f83db7.jpg"
            alt="Join Our Discord"
            className="discord-logo"
          />
          <a href="https://discord.gg/quiz" className="discord-text">
            Join Our Discord
          </a>
          <div className="confetti"></div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              How it Works
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Pricing
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Quiz Maker
            </a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Help Center
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Blog
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Community
            </a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              About Us
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Careers
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
