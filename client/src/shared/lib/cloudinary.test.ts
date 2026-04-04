import { expect, test } from 'vitest'
import { getOptimizedAvatar } from './cloudinary'

test('возвращает пустую строку если url пустой', () => {
    expect(getOptimizedAvatar('')).toBe('')
})

test('возвращает url без изменений если нет /upload', () => {
    const url = 'https://example.com/image.jpg'
    expect(getOptimizedAvatar(url)).toBe(url)
})

test('добавляет трансформации с дефолтными размерами', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    expect(getOptimizedAvatar(url)).toBe(
        'https://res.cloudinary.com/demo/image/upload/c_fill,w_200,h_200/sample.jpg'
    )
})

test('добавляет трансформации с кастомными размерами', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
    expect(getOptimizedAvatar(url, 400, 400)).toBe(
        'https://res.cloudinary.com/demo/image/upload/c_fill,w_400,h_400/sample.jpg'
    )
})