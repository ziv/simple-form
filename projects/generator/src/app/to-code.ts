#!/usr/bin/env -S ts-node

const next = (v: any): string => {
  switch (true) {
    case Array.isArray(v):
      return `[${v.map(next).join(',')}]`;
    case typeof v === 'boolean':
      return v ? 'true' : 'false';
    case typeof v === 'number':
      return `${v}`;
    case typeof v === 'string':
      return `'${v}'`
    case typeof v === 'object':
      return `\{${Object.entries(v).map(([key, value]) => `${key}:${next(value)}`).join(',')}\}`;
  }
  console.error('InferError', v);
  throw new Error('unable to infer type');
}


function toCode(inputs: any) {
  return next(inputs);
}
