/**
 * @jest-environment node
 */

const { asString, asOptionalString, createIpcGuard } = require('../ipcUtils');

describe('ipcUtils', () => {
  test('asString throws on empty and returns string', () => {
    expect(() => asString('', 'name')).toThrow('name must be a non-empty string');
    expect(asString('ok', 'name')).toBe('ok');
  });

  test('asOptionalString returns empty on null and throws on non-string', () => {
    expect(asOptionalString(null, 'content')).toBe('');
    expect(asOptionalString(undefined, 'content')).toBe('');
    expect(() => asOptionalString(123, 'content')).toThrow('content must be a string');
  });

  test('createIpcGuard blocks unauthorized sender', async () => {
    const guard = createIpcGuard(() => false);
    const handler = guard(async () => ({ ok: true }));
    const result = await handler({ sender: { id: 1 } });
    expect(result).toEqual({ ok: false, error: 'Unauthorized IPC sender' });
  });

  test('createIpcGuard passes through authorized sender', async () => {
    const guard = createIpcGuard(() => true);
    const handler = guard(async (_event, value) => ({ ok: true, value }));
    const result = await handler({ sender: { id: 1 } }, 42);
    expect(result).toEqual({ ok: true, value: 42 });
  });

  test('createIpcGuard converts thrown errors to ok:false', async () => {
    const guard = createIpcGuard(() => true);
    const handler = guard(async () => {
      throw new Error('boom');
    });
    const result = await handler({ sender: { id: 1 } });
    expect(result).toEqual({ ok: false, error: 'boom' });
  });
});
