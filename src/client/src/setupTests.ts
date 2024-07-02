import '@testing-library/jest-dom/vitest';

const localStorageMock = (() => {
  let store: Record<string, any> = {};

  return {
    clear: () => {
      store = {};
    },
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: any) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
    length: Object.keys(store).length
  };
})();

window.localStorage = localStorageMock;
