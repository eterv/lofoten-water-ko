export type Breakpoints = Record<string, number>;

/** Default breakpoints */
export const defaultBreakpoints = {
  xs: 0,
  s: 480,
  m: 768,
  l: 1024,
  xl: 1280,
  xxl: 1792,
};

/** Key media breakpoint that seperate small and big. */
// export const keyBreakpoint = defaultBreakpoints.m;

class Media {
  private bp: Breakpoints;
  private keyPoint: number;
  private _up: Record<string, string>;

  constructor(breakpoints: Breakpoints, keyBreakpoint: number) {
    this.bp = breakpoints;
    this.keyPoint = keyBreakpoint;

    this._up = {
      s: this.up('s'),
      m: this.up('m'),
      l: this.up('l'),
      xl: this.up('xl'),
      xxl: this.up('xxl'),
    };
  }

  max(name: string): number {
    const keys = Object.keys(this.bp);
    const n = keys.indexOf(name);
    const nextKey = n < 0 || n === keys.length - 1 ? null : keys[n + 1];

    return nextKey ? this.min(nextKey) - 0.02 : 0;
  }

  min(name: string): number {
    return this.bp[name] ?? 0;
  }

  up(name: string): string {
    const min = this.min(name);
    return min ? `@media (min-width: ${min}px)` : '';
  }

  down(name: string): string {
    const max = this.max(name);
    return max ? `@media (max-width: ${max}px)` : '';
  }

  between(lower: string, upper: string): string {
    const min = this.min(lower);
    const max = this.max(upper);

    if (!min && !max) return '';
    if (min && max) {
      return `@media (min-width: ${min}px) and (max-width: ${max}px)`;
    }
    return min ? this.up(lower) : this.down(upper);
  }

  only(name: string): string {
    return this.between(name, name);
  }

  get upS(): string {
    return this._up.s;
  }

  get upM(): string {
    return this._up.m;
  }

  get upL(): string {
    return this._up.l;
  }

  get upXL(): string {
    return this._up.xl;
  }

  get upXXL(): string {
    return this._up.xxl;
  }

  get small(): string {
    return `@media (max-width: ${this.keyPoint - 0.02}px)`;
  }

  get big(): string {
    return `@media (min-width: ${this.keyPoint}px)`;
  }
}

export const media = new Media(defaultBreakpoints, defaultBreakpoints.m);
