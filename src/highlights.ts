export type Highlight = {
  id: string
  page: number
  text: string // a short phrase from the PDF
  label: string
}

export const highlights: Highlight[] = [
  { id: '1', page: 1, text: 'COMPUTER NETWORKS', label: 'definition' },
  { id: '2', page: 2, text: 'Table of contents', label: 'formula' },
]