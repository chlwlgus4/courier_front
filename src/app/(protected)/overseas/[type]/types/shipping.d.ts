export interface ImageSwiperType {
  images: File[] | string[]
  removeImage?: (index: number) => void
  slidesPerView?: number
}

export type PreviewImage = {
  file?: File
  preview: string
  id?: number
}
