export const setUser = jest.fn();
export const isFeatureEnabled = jest.fn(() => false);
export const onReady = jest.fn(async () => ({ success: true, reason: null }));
export const isReady = jest.fn(() => true);

export const createInstance = () => {
  return {
    setUser,
    isFeatureEnabled,
    onReady,
    isReady,
  };
};

export const OptimizelyProvider = jest.fn(({ children }) => children);
export const enums = {
  LOG_LEVEL: {
    NOTSET: 0,
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
  },
};

export const useFeature = jest.fn(() => [false, {}, true, false]);
