import { expect, test } from 'vitest'
import { getMonth } from './formatMonth'

test('Январь', () => {
    expect(getMonth('2026-01-15')).toBe('Январь')
})

test('Декабрь', () => {
    expect(getMonth('2026-12-15')).toBe('Декабрь')
})

test('Февраля (pluralize)', () => {
    expect(getMonth('2026-02-15', 'pluralize')).toBe('Февраля')
})

test('default type = months', () => {
    expect(getMonth('2026-06-15')).toBe('Июнь')
})