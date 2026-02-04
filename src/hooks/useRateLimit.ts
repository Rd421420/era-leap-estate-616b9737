import { useState, useCallback } from "react";

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  storageKey: string;
}

interface RateLimitState {
  attempts: number;
  firstAttemptTime: number;
}

export const useRateLimit = (config: RateLimitConfig) => {
  const { maxAttempts, windowMs, storageKey } = config;
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const getStoredState = (): RateLimitState => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // localStorage not available or parse error
    }
    return { attempts: 0, firstAttemptTime: 0 };
  };

  const setStoredState = (state: RateLimitState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // localStorage not available
    }
  };

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const state = getStoredState();

    // Reset if window has passed
    if (now - state.firstAttemptTime > windowMs) {
      setStoredState({ attempts: 0, firstAttemptTime: 0 });
      setIsBlocked(false);
      setRemainingTime(0);
      return true;
    }

    // Check if blocked
    if (state.attempts >= maxAttempts) {
      const remaining = Math.ceil((windowMs - (now - state.firstAttemptTime)) / 1000 / 60);
      setRemainingTime(remaining);
      setIsBlocked(true);
      return false;
    }

    return true;
  }, [maxAttempts, windowMs, storageKey]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const state = getStoredState();

    // Reset if window has passed
    if (now - state.firstAttemptTime > windowMs) {
      setStoredState({ attempts: 1, firstAttemptTime: now });
      return;
    }

    // Increment attempts
    setStoredState({
      ...state,
      attempts: state.attempts + 1,
      firstAttemptTime: state.firstAttemptTime || now,
    });
  }, [windowMs, storageKey]);

  const getRemainingAttempts = useCallback((): number => {
    const now = Date.now();
    const state = getStoredState();

    if (now - state.firstAttemptTime > windowMs) {
      return maxAttempts;
    }

    return Math.max(0, maxAttempts - state.attempts);
  }, [maxAttempts, windowMs, storageKey]);

  return {
    checkRateLimit,
    recordAttempt,
    isBlocked,
    remainingTime,
    getRemainingAttempts,
  };
};
