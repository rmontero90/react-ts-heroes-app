import { describe, test, expect } from 'vitest';
import { cn } from './utils';

describe('cn function', () => {
  test('should combine multiple class strings', () => {
    const result = cn('text-red-500', 'bg-blue-200', 'p-4');
    expect(result).toBe('text-red-500 bg-blue-200 p-4');
  });

  test('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    );

    expect(result).toBe('base-class active-class');
  });

  test('should merge conflicting Tailwind classes', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  test('should handle empty strings and falsy values', () => {
    const result = cn('base-class', '', null, undefined, false);
    expect(result).toBe('base-class');
  });

  test('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  test('should handle objects with boolean values', () => {
    const result = cn({
      'always-present': true,
      'conditional-class': true,
      'never-present': false,
    });

    expect(result).toBe('always-present conditional-class');
  });

  test('should handle mixed input types', () => {
    const result = cn(
      'base-class',
      ['array-class1', 'array-class2'],
      { 'object-class': true },
      'string-class'
    );

    expect(result).toBe(
      'base-class array-class1 array-class2 object-class string-class'
    );
  });

  test('should handle nested arrays and objects', () => {
    const result = cn([
      'class1',
      { class2: true, class3: false },
      ['class4', 'class5'],
    ]);

    expect(result).toBe('class1 class2 class4 class5');
  });
});
