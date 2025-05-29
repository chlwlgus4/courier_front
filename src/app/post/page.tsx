'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

export default function PostPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('default')
  const [images, setImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setImages((prev) => [...prev, ...droppedFiles])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-xl font-bold mb-6">판매글 등록</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={'title'} className="block text-sm font-medium mb-1">
              제목
            </label>
            <input
              name={'title'}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor={'description'}
              className="block text-sm font-medium mb-1"
            >
              설명
            </label>
            <textarea
              name={'description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md p-2"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor={'price'} className="block text-sm font-medium mb-1">
              가격
            </label>
            <input
              name={'price'}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor={'category'}
              className="block text-sm font-medium mb-1"
            >
              카테고리
            </label>
            <select
              name={'category'}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="default" disabled>
                카테고리 선택
              </option>
              <option value="digital">1</option>
              <option value="fashion">2</option>
              <option value="etc">3</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="image-upload"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="block border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-400"
            >
              드래그 앤 드롭 또는 클릭해서 이미지 추가
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((file, index) => (
                  <div key={'file_' + index} className="relative group">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`업로드 이미지 ${index + 1}`}
                      width={300}
                      height={200}
                      className="rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            등록하기
          </button>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            onClick={() => router.back()}
          >
            나가기
          </button>
        </form>
      </div>
    </div>
  )
}
