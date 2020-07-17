function sum () {
  return 1 + 4
}

test('sum', () => {
  expect(sum()).toBe(5)
})
