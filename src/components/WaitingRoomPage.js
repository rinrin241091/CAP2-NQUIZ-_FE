import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import "../assets/styles/WaitingRoomPage.css";
import socket from "../socket";
import { playQuiz } from "../services/api";

export default function WaitingRoomPage(props) {
  const [showRoomId, setShowRoomId] = useState(true);
  const { roomId: urlRoomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = props.roomId || urlRoomId;
  const quizId = props.quizId || location.state?.quizId;
  const isHost = props.isHost ?? location.state?.isHost;
  const initialPlayers = props.players || location.state?.players || [];

  const [players, setPlayers] = useState(initialPlayers);
  const [maxWidth, setMaxWidth] = useState(0);
  const containerRef = useRef(null);

  const [playerName, setPlayerName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const hasJoinedRef = useRef(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!hasJoinedRef.current && !isHost && roomId) {
      if (!user) {
        setShowNamePrompt(true);
      } else {
        socket.emit("joinRoom", roomId, user.username);
        hasJoinedRef.current = true;
      }
    }

    socket.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
    });

    socket.on("kicked", () => {
      alert("Bạn đã bị host mời ra khỏi phòng.");
      navigate("/Home");
    });

    socket.on("gameStarted", () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({ ...player, status: "playing" }))
      );
      navigate(`/game-room/${roomId}?isHost=${isHost}`, {
        state: { quizId },
      });
    });

    socket.on("newQuestion", () => {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) => ({ ...player, status: "playing" }))
      );
      navigate(`/game-room/${roomId}?isHost=${isHost}`, {
        state: { quizId },
      });
    });

    socket.on("currentQuestion", (questionData) => {
      if (questionData) {
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) => ({ ...player, status: "playing" }))
        );
        navigate(`/game-room/${roomId}?isHost=${isHost}`, {
          state: { question: questionData },
        });
      }
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
    }

    return () => {
      socket.off("updatePlayers");
      socket.off("gameStarted");
      socket.off("newQuestion");
      socket.off("currentQuestion");
      socket.off("kicked");
    };
  }, [roomId, navigate, isHost]);

  useEffect(() => {
    if (!containerRef.current) return;
    const playerElements = containerRef.current.querySelectorAll(".player-name");
    let max = 0;
    playerElements.forEach((el) => {
      const w = el.scrollWidth;
      if (w > max) max = w;
    });
    setMaxWidth(max);
  }, [players]);

  const mid = Math.ceil(players.length / 2);
  const leftColumn = players.slice(0, mid);
  const rightColumn = players.slice(mid);
  const isTwoColumns = players.length > 8;
  const playerStyle = maxWidth ? { width: maxWidth + 20 } : {};

  const handleStartGame = async () => {
    try {
      await playQuiz(quizId);
      socket.emit("startGame", roomId);
    } catch (error) {
      console.error("Failed to update play count:", error);
      alert("Failed to start the game. Please try again.");
    }
  };

  const handleJoinAsGuest = () => {
    if (playerName.trim()) {
      socket.emit("joinRoom", roomId, playerName.trim());
      setShowNamePrompt(false);
      hasJoinedRef.current = true;
    } else {
      alert("Please enter your name");
    }
  };

  const handleKickPlayer = (socketId) => {
    socket.emit("kickPlayer", roomId, socketId);
  };

  const roomUrl = `${window.location.origin}/waiting-room/${roomId}`;

  return (
    <div className="waiting-wrapper">
      <div className="left-panel">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div>
            <p className="waiting-pin-label">PIN code:</p>
            {showRoomId ? (
              <p className="waiting-pin-number">{roomId}</p>
            ) : (
              <p className="waiting-pin-number">••••••</p>
            )}

            <div className="waiting-pin-actions">
              <button
                className="waiting-link-btn"
                onClick={() => navigator.clipboard.writeText(roomId)}
              >
                🔗 Copy
              </button>
              <button
                className="waiting-link-btn"
                onClick={() => setShowRoomId(!showRoomId)}
              >
                {showRoomId ? "🙈 Hide" : "👁️ Show"}
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "10px" }}>
            <p style={{ fontWeight: "bold", marginBottom: 8 }}>Scan to join</p>
            <QRCode value={roomUrl} size={160} />
          </div>
        </div>

        <button className="waiting-start-btn" onClick={() => navigate("/")}>HomePage</button>
        <p className="waiting-text">Waiting for players</p>

        <div className={`players-list ${isTwoColumns ? "two-columns" : ""}`} ref={containerRef}>
          {players.length === 0 ? (
            <p>No players have joined yet.</p>
          ) : isTwoColumns ? (
            <>
              <div className="column">
                {leftColumn.map((player, index) => (
                  <p key={`${player.id || player.name}-${index}`} className="player-name" style={playerStyle}>
                    {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                    {isHost && player.name !== user?.username && (
                      <button onClick={() => handleKickPlayer(player.id)} style={{ marginLeft: 8 }}>Kick</button>
                    )}
                  </p>
                ))}
              </div>
              <div className="column">
                {rightColumn.map((player, index) => (
                  <p key={`${player.id || player.name}-${index}`} className="player-name" style={playerStyle}>
                    {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                    {isHost && player.name !== user?.username && (
                      <button onClick={() => handleKickPlayer(player.id)} style={{ marginLeft: 8 }}>Kick</button>
                    )}
                  </p>
                ))}
              </div>
            </>
          ) : (
            players.map((player, index) => (
              <p key={`${player.id || player.name}-${index}`} className="player-name" style={playerStyle}>
                {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                {isHost && player.name !== user?.username && (
                 <button
                  className="kick-btn"
                  onClick={() => handleKickPlayer(player.id)}
                >
                  Kick
                </button>
                )}
              </p>
            ))
          )}
        </div>

        {isHost && (
          <button className="waiting-start-btn" onClick={handleStartGame}>
            Start game
          </button>
        )}
      </div>

      {showNamePrompt && (
        <div className="name-prompt-overlay">
          <div className="name-prompt-box">
            <h3>Enter your name to join</h3>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              autoFocus
            />
            <button onClick={handleJoinAsGuest}>Join Room</button>
          </div>
        </div>
      )}
    </div>
  );
}