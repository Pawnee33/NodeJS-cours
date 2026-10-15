import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

function App() {
  const [taches, setTaches] = useState([]);
  const [date, setDate] = useState("2026-10-14");

  const chargerTaches = async () => {
    try {
      const reponse = await fetch(`http://localhost:3001/jours/${date}`);
      setTaches(await reponse.json());
    } catch (erreur) {
      console.log("API injoignable :", erreur.message);
    }
  };

  useEffect(() => {
    chargerTaches();
  }, [date]);

  const reporter = async () => {
    await fetch("http://localhost:3001/reporter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utilisateurId: 3,
        de: date,
        vers: dayjs(date).add(1, 'day').format('YYYY-MM-DD')
      })
    });
    chargerTaches();
  };

  return (
    <>
      <ul>
        {taches.map((tache) => (
          <li key={tache.id}>{tache.titre}</li>
        ))}
      </ul>
      <input
      type="date"
      value={date}
      onChange={(evenement) => setDate(evenement.target.value)}
      />
      <button onClick={reporter}>Reporter sur demain</button>
    </>
  )
}

export default App
