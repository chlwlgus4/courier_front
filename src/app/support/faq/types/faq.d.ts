export interface Faq {
  id: number
  title: string
  content: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface FaqTagFilterProps {
  onSelectTag: (slug: string | null) => void
}

export interface FaqListProps {
  slug: string | null
}
