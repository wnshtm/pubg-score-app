import React from 'react';

export default function SearchForm({ player, index, onChange }) {
  return (
    <div className="player-input">
      <input
        className="nickname-input"
        placeholder="닉네임"
        value={player.nickname}
        onChange={(e) => onChange(index, "nickname", e.target.value)}
      />
      <div className="stats-grid">
        <input
          type="number"
          placeholder="킬"
          value={player.kill}
          onChange={(e) => onChange(index, "kill", e.target.value)}
        />
        <input
          type="number"
          placeholder="어시"
          value={player.assist}
          onChange={(e) => onChange(index, "assist", e.target.value)}
        />
        <input
          type="number"
          placeholder="딜"
          value={player.damage}
          onChange={(e) => onChange(index, "damage", e.target.value)}
        />
      </div>
    </div>
  );
}
