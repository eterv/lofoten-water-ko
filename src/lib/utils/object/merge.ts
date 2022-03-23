/**
 * Copyright (c) Tetritz and its affiliates.
 * Made By Lucas Choi
 *
 * Based on deepmerge 4.2.2
 * 2020-11-23
 *
 * This source code is licensed under the MIT License found in the
 * LICENSE file in the root directory of this source tree.
 */

/* ----------------------------------------------------------------------------------------- */

export interface Options {
  arrayMerge?(target: any[], source: any[], options?: Options): any[];
  clone?: boolean;
  customMerge?: (key: string, options?: Options) => ((x: any, y: any) => any) | undefined;
  isMergeableObject?(value: any): boolean;
}

/* ----------------------------------------------------------------------------------------- */

export function isMergeableObject(value: any): boolean {
  return isNonNullObject(value) && !isSpecial(value);
}

export function isNonNullObject(value: any): boolean {
  return !!value && typeof value === 'object';
}

function isSpecial(value: any): boolean {
  const stringValue = Object.prototype.toString.call(value);

  return (
    stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value)
  );
}

function isReactElement(value: any): boolean {
  const REACT_ELEMENT_TYPE =
    typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.element') : 0xeac7;
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val: any) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value: any, options: any) {
  return options.clone !== false && options.isMergeableObject(value)
    ? merge(emptyTarget(value), value, options)
    : value;
}

function defaultArrayMerge(target: any, source: any, options: any) {
  return target.concat(source).map((element: any) => {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key: any, options: any) {
  if (!options.customMerge) {
    return merge;
  }
  const customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : merge;
}

function getEnumerableOwnPropertySymbols(target: any): any[] {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter((symbol) => {
        return {}.propertyIsEnumerable.call(target, symbol);
      })
    : [];
}

function getKeys(target: any) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object: any, property: any) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: any, key: any) {
  return (
    propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
    !(
      Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
      Object.propertyIsEnumerable.call(target, key)
    )
  ); // and also unsafe if they're nonenumerable.
}

function mergeObject(target: any, source: any, options: any) {
  const destination: Record<string, any> = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach((key) => {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach((key) => {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

export function merge<T>(x: Partial<T>, y: Partial<T>, options?: Options): T;
export function merge<T1, T2>(x: Partial<T1>, y: Partial<T2>, options?: Options): T1 & T2;

export function merge(target: any, source: any, options?: Options): any {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;

  const sourceIsArray = Array.isArray(source);
  const targetIsArray = Array.isArray(target);
  const sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  }
  if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  }
  return mergeObject(target, source, options);
}

export function mergeAll(objects: any[], options?: Options): any;
export function mergeAll<T>(objects: Partial<T>[], options?: Options): T;

export function mergeAll(array: any[], options?: Options): any {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce((prev, next) => {
    return merge(prev, next, options);
  }, {});
}
