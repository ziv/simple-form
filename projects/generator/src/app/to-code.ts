export function toCode(inputs: unknown) {
  const next = (v: unknown): string => {
    switch (true) {
      case Array.isArray(v):
        return `[${(v as unknown[]).map(next).join(',')}]`;
      case typeof v === 'boolean':
        return v ? 'true' : 'false';
      case typeof v === 'number':
        return `${v}`;
      case typeof v === 'string':
        return `'${(v as string).replace("'", "\\'")}'`
      case typeof v === 'object':
        return `\{${Object.entries(v as object).map(([key, value]) => `${key}:${next(value)}`).join(',')}\}`;
    }
    throw new Error(`[InferError] unable to infer type of ${v}`);
  }
  return next(inputs);
}
