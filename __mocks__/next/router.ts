export const mockRouterOn = jest.fn();
export const Router = { events: { on: mockRouterOn } };
export const useRouter = (): { asPath: string; query: {} } => ({ asPath: 'mocked-path', query: {} });
