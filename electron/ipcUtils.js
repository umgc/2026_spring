function asString(value, fieldName) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${fieldName} must be a non-empty string`);
  }
  return value;
}

function asOptionalString(value, fieldName) {
  if (value == null) return '';
  if (typeof value !== 'string') throw new Error(`${fieldName} must be a string`);
  return value;
}

/**
 * Create an IPC guard wrapper that blocks unexpected senders and converts thrown
 * errors into consistent `{ ok: false, error }` payloads.
 */
function createIpcGuard(isAuthorizedSender) {
  if (typeof isAuthorizedSender !== 'function') {
    throw new Error('isAuthorizedSender must be a function');
  }
  return (handler) => {
    if (typeof handler !== 'function') {
      throw new Error('handler must be a function');
    }
    return async (event, ...args) => {
      if (!isAuthorizedSender(event)) {
        return { ok: false, error: 'Unauthorized IPC sender' };
      }
      try {
        return await handler(event, ...args);
      } catch (error) {
        return { ok: false, error: error?.message || 'IPC handler error' };
      }
    };
  };
}

module.exports = {
  asString,
  asOptionalString,
  createIpcGuard,
};
