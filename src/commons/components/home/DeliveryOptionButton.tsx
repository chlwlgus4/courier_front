import Image from 'next/image'
import { useState } from 'react'

const DeliveryOptionButton = ({
  title,
  image,
  selected,
  onClick,
  width = 32,
  height = 32,
}: {
  title: string
  image?: string
  selected: boolean
  onClick: () => void
  width?: number
  height?: number
}) => {
  const [btnClass, setBtnClass] = useState<string>(
    `w-${width - 20} h-${height - 20} flex items-center justify-center`,
  )

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-2xl border transition shadow-sm ${
        selected
          ? 'bg-blue-300 text-white border-blue-300'
          : 'bg-white text-gray-800 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div
        className="flex items-center flex-col gap-2"
        style={{ width: '100%' }}
      >
        <div className={btnClass}>
          {image && (
            <Image
              src={image}
              alt={title}
              className="object-contain"
              height={height}
              width={width}
            />
          )}
        </div>
        <span className="font-semibold text-base">{title}</span>
      </div>
    </button>
  )
}
export default DeliveryOptionButton
