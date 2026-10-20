import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from './server.mjs'
test('local server serves assets but refuses writes, source and traversal', async () => {
  const server = createServer()
  await new Promise(r => server.listen(0, '127.0.0.1', r))
  const base = 'http://127.0.0.1:' + server.address().port
  try {
    const good = await fetch(base + '/biziva/index.html')
    assert.equal(good.status, 200)
    assert.ok(good.headers.get('content-security-policy').includes("connect-src 'none'"))
    assert.equal(good.headers.get('cache-control'), 'no-store')
    for (const p of [
      '/biziva/server.mjs',
      '/biziva/../../package.json',
      '/biziva/%2e%2e%2fpackage.json',
      '/.env',
    ])
      assert.equal((await fetch(base + p)).status, 404)
    assert.equal((await fetch(base + '/biziva/app.mjs', { method: 'POST' })).status, 405)
  } finally {
    await new Promise(r => server.close(r))
  }
})
import { cards } from './logic.mjs'
const base = {
  brand: 'Biziva',
  title: 'Um ótimo projeto',
  body: 'Seu texto aqui',
  cta: 'Saiba mais',
  color: '#d51a40',
  format: 'square',
}
test('SVG uses exact dimensions, escaped text and no executable elements', () => {
  const svg = cards({ ...base, title: '<script>alert(1)</script>' })
  assert.ok(svg.includes('&lt;script&gt;'))
  assert.ok(!svg.includes('<script>'))
  assert.ok(svg.includes('height="1080"'))
  assert.ok(cards({ ...base, format: 'portrait' }).includes('height="1350"'))
})
test('rejects color injection and overflowing text rather than clipping silently', () => {
  for (const patch of [
    { color: 'red" onload="alert(1)' },
    { title: 'a'.repeat(65) },
    { body: 'b'.repeat(181) },
    { format: 'other' },
  ])
    assert.throws(() => cards({ ...base, ...patch }))
})
