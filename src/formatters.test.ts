import { expect, test } from 'vitest'
import * as mod from './formatters'

test('formatNumber', () => {
  expect(mod.formatNumber(1000.95)).toBe('1,000.95')
  expect(mod.formatNumber(1000.95, { decimals: 2 })).toBe('1,000.95')
  expect(mod.formatNumber(1000.95, { decimals: 2, locale: 'id-ID' })).toBe('1.000,95')
})

test('formatCurrency', () => {
  expect(mod.formatCurrency(0)).toBe('$0.00')
  expect(mod.formatCurrency(0, { decimals: 0 })).toBe('$0')
  expect(mod.formatCurrency(1000.95)).toBe('$1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2 })).toBe('$1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-GB' })).toBe('£1,000.95')
  expect(mod.formatCurrency(1000, { decimals: 0, locale: 'ja-JP' })).toBe('￥1,000')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-GB' })).toBe('£1,000.95')
  expect(mod.formatCurrency(1000.95, { decimals: 2, locale: 'en-au' })).toBe('$1,000.95')
})

test('formatValuation', () => {
  expect(mod.formatValuation(0)).toBe('$0.00')
  expect(mod.formatValuation(12345678)).toBe('$12.35M')
  expect(mod.formatValuation(12345678, { decimals: 0 })).toBe('$12M')
  expect(mod.formatValuation(12345678, { decimals: 0, locale: 'en-GB' })).toBe('£12M')
  expect(mod.formatValuation(12345678, { decimals: 2, locale: 'en-GB' })).toBe('£12.35M')
})

test('formatDurationLabels', () => {
  expect(mod.formatDurationLabels(0)).toBe('0 seconds')
  expect(mod.formatDurationLabels(3600)).toBe('1 hour')
  expect(mod.formatDurationLabels(3600 * 2, { labels: 'short' })).toBe('2hr')
  expect(mod.formatDurationLabels(3600 * 2, { labels: 'long' })).toBe('2 hours')
  expect(mod.formatDurationLabels(3600 * 2 + 60)).toBe('2 hours 1 minute')
  expect(mod.formatDurationLabels(3600 * 2 + 60 + 1)).toBe('2 hours 1 minute 1 second')
})

test('formatPercentage', () => {
  expect(mod.formatPercentage(0.1234, { decimals: 0 })).toBe('12%')
  expect(mod.formatPercentage(0.1234, { decimals: 2 })).toBe('12.34%')
  expect(mod.formatPercentage(0.125, { decimals: 0 })).toBe('13%')
})

test('formatList', () => {
  expect(mod.formatList(['Apple', 'Oranges'])).toBe('Apple and Oranges')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Grapefruit'])).toBe('Apple, Oranges, Bananas and Grapefruit')
  expect(mod.formatList(['Apple', 'Oranges'], { limit: 2 })).toBe('Apple and Oranges')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas'], { limit: 2 })).toBe('Apple, Oranges and 1 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas'], { limit: 3, conjunction: 'or' })).toBe('Apple, Oranges or Bananas')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears'], { limit: 2 })).toBe('Apple, Oranges and 2 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears', 'Grapes'], { limit: 2 })).toBe('Apple, Oranges and 3 more')
  expect(mod.formatList(['Apple', 'Oranges', 'Bananas', 'Pears', 'Grapes'], { limit: 2, conjunction: 'or' })).toBe('Apple, Oranges or 3 more')
  expect(mod.formatList([], { limit: 2, conjunction: 'or' })).toBe('')
})

test('formatTitle', () => {
  expect(mod.formatTitle('hello world')).toBe('Hello World')
  expect(mod.formatTitle('welcome to the jungle')).toBe('Welcome to the Jungle')
  expect(mod.formatTitle('the quick brown fox jumps over the lazy dog')).toBe('The Quick Brown Fox Jumps Over the Lazy Dog')
  expect(mod.formatTitle('UseMods is cooler than a vegan leather jacket')).toBe('UseMods is Cooler than a Vegan Leather Jacket')
  // @ts-expect-error: null is not a valid input for formatTitle
  expect(mod.formatTitle(null)).toBe('')
  // @ts-expect-error: undefined is not a valid input for formatTitle
  expect(mod.formatTitle(undefined)).toBe('')
})

test('formatNumberToWord', () => {
  expect(mod.formatNumberToWords(0)).toBe('zero')
  expect(mod.formatNumberToWords(1)).toBe('one')
  expect(mod.formatNumberToWords(12)).toBe('twelve')
  expect(mod.formatNumberToWords(123)).toBe('one hundred and twenty-three')
  expect(mod.formatNumberToWords(1234)).toBe('one thousand, two hundred and thirty-four')
  expect(mod.formatNumberToWords(12345)).toBe('twelve thousand, three hundred and forty-five')
  expect(mod.formatNumberToWords(123456)).toBe('one hundred and twenty-three thousand, four hundred and fifty-six')
  expect(mod.formatNumberToWords(1234567)).toBe('one million, two hundred and thirty-four thousand, five hundred and sixty-seven')
  expect(mod.formatNumberToWords(12345678)).toBe('twelve million, three hundred and forty-five thousand, six hundred and seventy-eight')
  expect(mod.formatNumberToWords(123456789)).toBe('one hundred and twenty-three million, four hundred and fifty-six thousand, seven hundred and eighty-nine')
  expect(mod.formatNumberToWords(1234567890)).toBe('one billion, two hundred and thirty-four million, five hundred and sixty-seven thousand, eight hundred and ninety')
  expect(mod.formatNumberToWords(12345678901)).toBe('twelve billion, three hundred and forty-five million, six hundred and seventy-eight thousand, nine hundred and one')
  expect(mod.formatNumberToWords(123456789012)).toBe('one hundred and twenty-three billion, four hundred and fifty-six million, seven hundred and eighty-nine thousand, twelve')
  expect(mod.formatNumberToWords(1234567890123)).toBe(
    'one trillion, two hundred and thirty-four billion, five hundred and sixty-seven million, eight hundred and ninety thousand, one hundred and twenty-three'
  )
})

test('formatUnixTime', () => {
  expect(mod.formatUnixTime(1620000000)).toBe('2021-05-03 00:00:00.000')
})

test('formatInitials', () => {
  expect(mod.formatInitials('Penelope Pitstop')).toBe('PP')
  expect(mod.formatInitials('Zippy')).toBe('Z')
  expect(mod.formatInitials('Dr. Robotnik')).toBe('R')
  expect(mod.formatInitials('Mrs. Marple')).toBe('M')
  expect(mod.formatInitials('William W Whittle', { length: 3 })).toBe('WWW')
  expect(mod.formatInitials('William Snrmadeup', { length: 2 })).toBe('WS')
  expect(mod.formatInitials('William Stan', { length: 2 })).toBe('WS')
  // @ts-expect-error: undefined is not a valid input for formatInitials
  expect(mod.formatInitials(undefined)).toBe('')
  // @ts-expect-error: null is not a valid input for formatInitials
  expect(mod.formatInitials(null)).toBe('')
})
