import { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './styles.css'

function SectionCard({
                         title, loading, children,
                     }: {
    title: string; loading: boolean; children: React.ReactNode
}) {
    return (
        <div className="card">
            <div className="card-header">
                <h2>{title}</h2>
                {loading && <span className="muted">Loading…</span>}
            </div>
            <div className="card-body">
                {children}
                {loading && (
                    <div className="loader" aria-busy="true" aria-live="polite">
                        <div className="spinner" />
                    </div>
                )}
            </div>
        </div>
    )
}

type NewsItem = { id: number; title: string }
type Grade = { course: string; grade: string }

/** --- Pages --- */
function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://bff.wab4.jf-homelab.de/api/news')
            .then(r => (r.ok ? r.json() : []))
            .then(setNews)
            .catch(() => setNews([{ id: 1, title: 'Demo News (fallback)' }]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <SectionCard title="News" loading={loading}>
            <ul className="clean">
                {news.map(n => <li key={n.id}>{n.title}</li>)}
            </ul>
        </SectionCard>
    )
}

function GradesPage() {
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://bff.wab4.jf-homelab.de/api/grades')
            .then(r => (r.ok ? r.json() : []))
            .then(setGrades)
            .catch(() => setGrades([{ course: 'Math', grade: '1.7 (demo)' }]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <SectionCard title="Grades" loading={loading}>
            <table className="table">
                <tbody>
                {grades.map((g, i) => (
                    <tr key={i}>
                        <td>{g.course}</td>
                        <td style={{ textAlign: 'right' }}>{g.grade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </SectionCard>
    )
}

/** --- App Shell mit Router --- */
export default function App() {
    return (
        <div className="app-shell">
            <nav
                className="navbar"
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "1rem",
                    padding: "10px 20px",
                    background: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                }}
            >

                SMS Prototype - Monolith UI

                <NavLink
                    to="/"
                    end
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#000" : "#555",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "30px",
                    })}
                >
                    News
                </NavLink>

                <NavLink
                    to="/grades"
                    style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "#000" : "#555",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "30px",

                    })}
                >
                    Grades
                </NavLink>
            </nav>


            <main style={{ padding: 20, display: 'grid', gap: 20 }}>
                <Routes>
                    <Route path="/" element={<NewsPage />} />
                    <Route path="/grades" element={<GradesPage />} />
                </Routes>
            </main>

            <footer className="footer">Footer</footer>
        </div>
    )
}
