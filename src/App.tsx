import {useEffect, useState} from 'react';

function App() {
    type NewsItem = { id: number; title: string };
    const [items, setItems] = useState<NewsItem[]>([]);

    type Grade = { course: string; grade: string };
    const [grades, setGrades] = useState<Grade[]>([]);


    useEffect(() => {
        // Optional: hol dir Daten vom Mock-Backend (Hono) – sonst Demo‑Daten
        fetch('http://localhost:3000/api/news')
            .then(r => r.ok ? r.json() : [])
            .then(setItems)
            .catch(() => setItems([{id: 1, title: 'Demo News (fallback)'}]));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/api/grades')
            .then(r => r.ok ? r.json() : [])
            .then(setGrades)
            .catch(() => setGrades([{course: 'Math', grade: '1.7 (demo)'}]));
    }, []);

    return (
        <>
            <div style={{padding: 16}}>
                <h1>Root UI (Host)</h1>

                <section style={{marginTop: 16}}>
                    <h2>News</h2>
                    <div style={{padding: 12, border: '1px solid #eee', borderRadius: 12}}>
                        <h3>News Service</h3>
                        <ul>
                            {items.map(n => <li key={n.id}>{n.title}</li>)}
                        </ul>
                    </div>
                </section>

                <section style={{marginTop: 16}}>
                    <h2>Grades</h2>
                    <div style={{padding: 12, border: '1px solid #eee', borderRadius: 12}}>
                        <h3>Grade Service</h3>
                        <table>
                            <tbody>
                            {grades.map((g, i) => (
                                <tr key={i}>
                                    <td style={{paddingRight: 8}}>{g.course}</td>
                                    <td>{g.grade}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default App
