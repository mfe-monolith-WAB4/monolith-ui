import { useEffect, useState } from 'react'
// wichtig: globales CSS laden (falls noch nicht)
import './styles.css'

function SectionCard({
                         title,
                         loading,
                         children,
                     }: {
    title: string
    loading: boolean
    children: React.ReactNode
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

export default function App() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [grades, setGrades] = useState<Grade[]>([])
    const [loadingNews, setLoadingNews] = useState(true)
    const [loadingGrades, setLoadingGrades] = useState(true)

    useEffect(() => {
        fetch('https://bff.wab4.jf-homelab.de/api/news')
            .then((r) => (r.ok ? r.json() : []))
            .then(setNews)
            .catch(() => setNews([{ id: 1, title: 'Demo News (fallback)' }]))
            .finally(() => setLoadingNews(false))
    }, [])

    useEffect(() => {
        fetch('https://bff.wab4.jf-homelab.de/api/grades')
            .then((r) => (r.ok ? r.json() : []))
            .then(setGrades)
            .catch(() => setGrades([{ course: 'Math', grade: '1.7 (demo)' }]))
            .finally(() => setLoadingGrades(false))
    }, [])

    return (
        <div className="app-shell">
            <nav className="navbar">Navigation</nav>

            <main style={{ padding: 20, display: 'grid', gap: 20 }}>
                <SectionCard title="News" loading={loadingNews}>
                    <ul className="clean">
                        {news.map((n) => (
                            <li key={n.id}>{n.title}</li>
                        ))}
                    </ul>
                </SectionCard>

                <SectionCard title="Grades" loading={loadingGrades}>
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
            </main>

            <footer className="footer">Footer</footer>
        </div>
    )
}
