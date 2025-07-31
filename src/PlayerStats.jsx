import React from 'react';

export default function PlayerStats({ results }) {
  if (results.length === 0) {
    return null;
  }

  return (
    <section className="results-section">
      <h2>결과</h2>
      <div>
        {results.map((p, i) => (
          <div key={i} className={`result-item ${i === 0 ? 'winner' : ''}`}>
            <span className="rank">{i + 1}</span>
            <span className="nickname">{p.nickname || `플레이어 ${i + 1}`}</span>
            <span className="score">{p.score}점</span>
          </div>
        ))}
      </div>
    </section>
  );
}
