export const mockRouterOn = jest.fn();
export const Router = { events: { on: mockRouterOn } };
export const useRouter = (): { asPath: string; query: unknown } => ({ asPath: 'mocked-path', query: {} });
