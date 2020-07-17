function sum () {
  return 1 + 6
}

test('sum', () => {
  expect(sum()).toBe(7)
})
