import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell({ title, children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Topbar title={title} />
        <div className="content">{children}</div>
      </main>
    </div>
  )
}