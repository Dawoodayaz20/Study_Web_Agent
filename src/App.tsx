import { useState } from 'react'
import PdfViewer from './PdfViewer'

const tabs = ['Highlights', 'Quiz', 'Progress'] as const
type Tab = (typeof tabs)[number]

export default function App() {
  const [tab, setTab] = useState<Tab>('Highlights')

  return (
    <div className="grid h-screen grid-cols-[1.25fr_1fr] gap-3 bg-gray-100 p-3">
      {/* Left: PDF area */}
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <PdfViewer file="/CS610 Handouts By Paradoxical Highlighted.pdf" />
      </section>

      {/* Right: tabs + chat */}
      <section className="flex flex-col rounded-xl bg-white p-4 shadow-sm">
        <nav className="mb-3 flex gap-1 border-b pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1 text-sm ${
                tab === t
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto text-sm text-gray-600">
          {tab} content here
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2">
          <input
            className="flex-1 text-sm outline-none"
            placeholder="Explain this page…"
          />
          <button className="text-gray-400">→</button>
        </div>
      </section>
    </div>
  )
}