export interface ImageSwiperType {
  images: File[]
  removeImage?: (index: number) => void
  slidesPerView?: number
}
