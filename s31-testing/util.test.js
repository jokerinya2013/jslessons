const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('İbrahim', 30);
  expect(text2).toBe('İbrahim (30 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

test('should generete a valid text output', () => {
  const text = checkAndGenerate('İbrahim', 30);
  expect(text).toBe('İbrahim (30 years old)');
});
