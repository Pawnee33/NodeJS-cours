import { useEffect, useState } from 'react'

function App() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/taches")
    .then((response) => response.json())
    .then((tachesRecupere) => setTaches(tachesRecupere));
  }, []);

  return (
    <ul>
      {taches.map((tache) => (
       <li key={tache.id}>{tache.titre}</li>
      ))}
    </ul>
  )
}

export default App
