export type Category = 'overseas' | 'purchase' | 'forwarding' | 'warehouse'

export interface CategoryProps {
  current: Category
  onChange: (c: Category) => void
}

export interface GridProps {
  category: Category
}
