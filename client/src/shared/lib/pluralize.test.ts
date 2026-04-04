import { test, expect } from "vitest";
import { pluralize } from "./pluralize";

test('1 оценка', () => {
    expect(pluralize(1, 'оценка', 'оценки', 'оценок')).toBe('оценка')
})

test('2 оценки', () => {
    expect(pluralize(2, 'оценка', 'оценки', 'оценок')).toBe('оценки')
})

test('11 оценок', () => {
    expect(pluralize(11, 'оценка', 'оценки', 'оценок')).toBe('оценок')
})

test('21 оценка', () => {
    expect(pluralize(21, 'оценка', 'оценки', 'оценок')).toBe('оценка')
})

test('100 оценок', () => {
    expect(pluralize(100, 'оценка', 'оценки', 'оценок')).toBe('оценок')
})

test('101 оценока', () => {
    expect(pluralize(101, 'оценка', 'оценки', 'оценок')).toBe('оценка')
})