import { useState, useMemo } from "react";

function calculateScore(kill, damage, assist) {
  const kScore = 120 * Math.sqrt(kill);
  const dScore = Math.log2(1 + Math.min(damage, 1000)) * 20;
  const aScore = Math.pow(assist, 1.5) * 30;
  const bonus = kill * assist * 5;
  return Math.round(kScore + dScore + aScore + bonus);
}

function PlayerInput({ player, index, onChange }) {
  return (
    <div style={{ marginBottom: 15, padding: 10, border: "1px solid #ccc", borderRadius: 10 }}>
      <input
        placeholder="닉네임"
        value={player.nickname}
        onChange={(e) => onChange(index, "nickname", e.target.value)}
        style={{ width: "100%", marginBottom: 5, padding: 8, boxSizing: 'border-box' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
        <input
          type="number"
          placeholder="킬"
          value={player.kill}
          onChange={(e) => onChange(index, "kill", e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: 'border-box' }}
        />
        <input
          type="number"
          placeholder="어시"
          value={player.assist}
          onChange={(e) => onChange(index, "assist", e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: 'border-box' }}
        />
        <input
          type="number"
          placeholder="딜"
          value={player.damage}
          onChange={(e) => onChange(index, "damage", e.target.value)}
          style={{ width: "100%", padding: 8, boxSizing: 'border-box' }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [players, setPlayers] = useState(() =>
    Array.from({ length: 4 }, () => ({ nickname: "", kill: 0, assist: 0, damage: 0 }))
  );

  const handleChange = (index, field, value) => {
    const newPlayers = [...players];
    newPlayers[index][field] = field === "nickname" ? value : parseInt(value || 0, 10);
    setPlayers(newPlayers);
  };

  const results = useMemo(() => {
    if (players.every(p => p.kill === 0 && p.assist === 0 && p.damage === 0)) {
      return [];
    }
    const scored = players.map((p) => ({
      ...p,
      score: calculateScore(p.kill, p.damage, p.assist),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [players]);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20, fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold" }}>PUBG 스코어 계산기</h1>
      </header>
      
      <main>
        {players.map((player, index) => (
          <PlayerInput key={index} player={player} index={index} onChange={handleChange} />
        ))}
      </main>

      {results.length > 0 && (
        <section style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: "bold", textAlign: 'center', marginBottom: 15 }}>결과</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {results.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', background: i === 0 ? '#ffd700' : '#f0f0f0', padding: '10px 15px', borderRadius: 8, fontWeight: i === 0 ? 'bold' : 'normal' }}>
                <span>{i + 1}. {p.nickname || `플레이어 ${i + 1}`}</span>
                <span>{p.score}점</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
