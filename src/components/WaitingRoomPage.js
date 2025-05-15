import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Thêm useNavigate
import "../assets/styles/WaitingRoomPage.css";
import socket from "../socket";

export default function WaitingRoomPage({ roomId: propRoomId, players: initialPlayers = [], isHost }) {
  const { roomId: urlRoomId } = useParams();
  const roomId = propRoomId || urlRoomId;
  const navigate = useNavigate(); // Khởi tạo navigate

  const [players, setPlayers] = useState(initialPlayers);
  const [maxWidth, setMaxWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    socket.on("updatePlayers", (playersList) => {
      setPlayers(playersList);
    });

    socket.on("gameStarted", () => {
      // Khi server báo game bắt đầu, chuyển trang sang màn chơi
      navigate(`/game-room/${roomId}`);
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
    }

    return () => {
      socket.off("updatePlayers");
      socket.off("gameStarted");
    };
  }, [roomId, navigate]);

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

  const playerStyle = maxWidth ? { width: maxWidth + 20 } : {}; // +20 padding dự phòng

  // Hàm xử lý nút start game
  const handleStartGame = () => {
    socket.emit("startGame", roomId);
  };

  return (
    <div className="waiting-wrapper">
      <div className="left-panel">
        <p className="waiting-pin-label">PIN code:</p>
        <p className="waiting-pin-number">{roomId}</p>

        <div className="waiting-pin-actions">
          <button className="waiting-link-btn" onClick={() => navigator.clipboard.writeText(roomId)}>🔗 Copy</button>
          <button className="waiting-link-btn" onClick={() => alert("Mã phòng đã bị ẩn!")}>🙈 Hide</button>
        </div>

        <p className="waiting-text">Waiting for players</p>

        <div className={`players-list ${isTwoColumns ? "two-columns" : ""}`} ref={containerRef}>
          {players.length === 0 ? (
            <p>No players have joined yet.</p>
          ) : isTwoColumns ? (
            <>
              <div className="column">
                {leftColumn.map((player, index) => (
                  <p key={index} className="player-name" style={playerStyle}>
                    {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                  </p>
                ))}
              </div>
              <div className="column">
                {rightColumn.map((player, index) => (
                  <p key={index} className="player-name" style={playerStyle}>
                    {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
                  </p>
                ))}
              </div>
            </>
          ) : (
            players.map((player, index) => (
              <p key={index} className="player-name" style={playerStyle}>
                {player.name} {player.status === "waiting" ? "🕒 Waiting" : "🎮 Playing"}
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
    </div>
  );
}
