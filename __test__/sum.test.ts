function sum () {
  return 1 + 2
}

test('sum', () => {
  expect(sum()).toBe(4)
})
