export interface ImageSwiperType {
  images: File[]
  removeImage?: (index: number) => void
  slidesPerView?: number
}

export type PreviewImage = {
  file: File
  preview: string
}
