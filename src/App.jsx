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
