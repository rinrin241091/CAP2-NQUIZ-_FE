import React from "react";
import "../assets/styles/WaitingRoomPage.css";

export default function WaitingRoomPage() {
  return (
    <div className="waiting-wrapper">
      {/* Left side - Join info */}
      <div className="left-panel">
        <p className="join-text">Join at:</p>
        <img
          src="/quiz-logo-colored.png"
          alt="Quiz.com"
          className="quiz-com-logo"
        />

        <p className="waiting-pin-label">PIN code:</p>
        <p className="waiting-pin-number">646 945</p>

        <div className="waiting-pin-actions">
          <button className="waiting-link-btn">🔗 Copy</button>
          <button className="waiting-link-btn">🙈 Hide</button>
        </div>

        <img src="/qr.png" alt="QR Code" className="qr-code" />

        <p className="waiting-text">Waiting for players</p>
        <p className="waiting-join-device">👤 Join on this device</p>

        <button className="waiting-start-btn">Start game</button>
      </div>

      {/* Right side - Quiz Info and Settings */}
      <div className="waiting-right-panel">
        <div className="waiting-quiz-card">
          <div className="waiting-quiz-thumb">🖼️</div>
          <div>
            <p className="waiting-quiz-title">Football 2.0</p>
            <p className="waiting-quiz-meta">2 slides • 🌍 Unknown</p>
            <p className="waiting-preview-btn">👁️ Preview</p>
          </div>
        </div>

        <div className="waiting-scrollable-settings">
          <div className="waiting-settings-block">
            <h3>Sound</h3>
            <div className="waiting-slider-row">
              Music <input type="range" />
            </div>
            <div className="waiting-slider-row">
              YouTube <input type="range" />
            </div>
            <div className="waiting-slider-row">
              Voice <input type="range" />
            </div>
            <div className="waiting-slider-row">
              Effects <input type="range" />
            </div>
          </div>

          <div className="waiting-settings-block">
            <h3>Gameplay</h3>
            <div className="waiting-option">
              <input type="checkbox" /> Team mode{" "}
              <span className="tag-new">NEW!</span>
            </div>
            <div className="waiting-option">
              <input type="checkbox" /> Hide leaderboard
            </div>
            <div className="waiting-option">
              <input type="checkbox" /> Hide country flags
            </div>
            <div className="waiting-option">
              <input type="checkbox" /> No YouTube media
            </div>
            <div className="waiting-option">
              <input type="checkbox" /> Mute sound on players devices
            </div>
            <div className="waiting-option">
              <input type="checkbox" /> Optimize performance
            </div>
          </div>

          <div className="waiting-settings-block">
            <h3>Safety</h3>
            <div className="waiting-option">
              <input type="checkbox" id="safe-names" />{" "}
              <label htmlFor="safe-names">Only safe player names</label>
            </div>
            <div className="waiting-option">
              <input type="checkbox" id="hide-type-answers" />{" "}
              <label htmlFor="hide-type-answers">
                Hide incorrect type-answers
              </label>
            </div>
            <div className="waiting-option">
              <input type="checkbox" id="dont-read-names" />{" "}
              <label htmlFor="dont-read-names">
                Don't read out player names
              </label>
            </div>
            <div className="waiting-option">
              <input type="checkbox" id="ban-kicked" />{" "}
              <label htmlFor="ban-kicked">Ban kicked players</label>
            </div>
          </div>

          <div className="waiting-custom-settings">
            <h3>You got custom settings</h3>
            <button className="waiting-reset-btn">Reset all settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
