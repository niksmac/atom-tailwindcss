'use strict';

const test = require('tape');
const autcomplete = require('../src');
const provider = require('../src/provider');

test('package', async t => {
  t.equal(await autcomplete.getProvider(), provider, 'package loads autocompletion provider');
  t.end();
});

test('suggestions', async (t) => {
  const suggestions = await provider.getSuggestions({ prefix: 'bg-red-darkest' });
  t.equal(suggestions[0].text, 'bg-red-darkest', 'suggest completion bg-red-darkest');
  t.end();
});
