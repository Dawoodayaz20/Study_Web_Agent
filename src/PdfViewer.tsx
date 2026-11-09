import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { highlights } from './highlights'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function PdfViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const pageHighlights = highlights.filter((h) => h.page === page)

  const renderText = ({ str }: { str: string }) => {
  const safe = str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const hit = pageHighlights.some((h) => str.includes(h.text))
  return hit ? `<mark class="bg-yellow-200">${safe}</mark>` : safe
  
  }
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
        <span>{file.split('/').pop()}</span>
        <span className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>‹</button>
          {page} / {numPages}
          <button disabled={page >= numPages} onClick={() => setPage(page + 1)}>›</button>
        </span>
      </div>

      <div className="flex-1 overflow-auto rounded-lg bg-gray-50 p-2">
        <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          <Page pageNumber={page} width={560} customTextRenderer={renderText}  />
        </Document>
      </div>
    </div>
  )
}