import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocalFallback, ALI_SYSTEM_PROMPT } from '../src/data/aliKnowledgeBase.js';

test('confidentiality: prompt never reveals loghomestore.ca domain', () => {
  assert.equal(ALI_SYSTEM_PROMPT.includes('loghomestore.ca'), false);
});

test('case study fallback returns link', () => {
  const reply = getLocalFallback('Can I see your case study?');
  assert.match(reply, /\/case-study\.html/);
});

test('client identity fallback returns confidential notice', () => {
  const reply = getLocalFallback('What is the client company name?');
  assert.match(reply, /confidential/i);
});
