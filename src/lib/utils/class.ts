// This is inspired from clsx.

function toVal(value: any): string {
  let s = '';
  if (typeof value === 'string' || typeof value === 'number') {
    s += value;
  } else if (typeof value === 'object') {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i]) {
          const x = toVal(value[i]);
          if (x) {
            s += s ? ` ${x}` : x;
          }
        }
      }
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const k in value) {
        if (value[k]) {
          s += s ? ` ${k}` : k;
        }
      }
    }
  }
  return s;
}

export function cls(...args: any[]): string {
  let s = '';
  for (let i = 0; i < args.length; i++) {
    const temp = args[i];
    if (temp) {
      const x = toVal(temp);
      if (x) {
        s += s ? ` ${x}` : x;
      }
    }
  }
  return s;
}
