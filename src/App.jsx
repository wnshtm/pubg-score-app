import { useState, useMemo } from "react";
import SearchForm from './SearchForm';
import PlayerStats from './PlayerStats';

function calculateScore(kill, damage, assist) {
  const kScore = 120 * Math.sqrt(kill);
  const dScore = Math.log2(1 + Math.min(damage, 1000)) * 20;
  const aScore = Math.pow(assist, 1.5) * 30;
  const bonus = kill * assist * 5;
  return Math.round(kScore + dScore + aScore + bonus);
}

export default function App() {
  const [players, setPlayers] = useState(() =>
    Array.from({ length: 4 }, () => ({ nickname: "", kill: "", assist: "", damage: "" }))
  );

  const handleChange = (index, field, value) => {
    const newPlayers = [...players];
    if (field !== 'nickname' && !/^\d*$/.test(value)) {
      return;
    }
    newPlayers[index][field] = value;
    setPlayers(newPlayers);
  };

  const results = useMemo(() => {
    if (players.every(p => !p.kill && !p.assist && !p.damage)) {
      return [];
    }
    const scored = players.map((p) => {
      const kill = parseInt(p.kill || 0, 10);
      const damage = parseInt(p.damage || 0, 10);
      const assist = parseInt(p.assist || 0, 10);
      return {
        ...p,
        score: calculateScore(kill, damage, assist),
      };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }, [players]);

  return (
    <>
      <header>
        <h1>PUBG 스코어 계산기</h1>
      </header>
      
      <main>
        {players.map((player, index) => (
          <SearchForm key={index} player={player} index={index} onChange={handleChange} />
        ))}
      </main>

      <PlayerStats results={results} />
    </>
  );
}
