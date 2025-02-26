import '@testing-library/jest-dom';

(global as any).localStorage = {
    length: 0,
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    key: jest.fn().mockImplementation((index: number) => null),
};
