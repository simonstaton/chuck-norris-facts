import React from 'react';
import renderer from 'react-test-renderer';
import helpers from '../scripts/src/helpers.js';

describe('Helpers utility', () => {
  it('tests for dom access (server/client detection)', () => {
    expect(helpers.canUseDOM).toBeTruthy(); // Should be true with shadow dom
  });
  it('truncates a string to the last word', () => {
  	const value = 'Lorem ipsum dolar sit amet';
  	const trimmed = helpers.truncate(value, value.length - 3);
    expect(trimmed.length).toBe(`${value}...`.length - 5);
  });
});
