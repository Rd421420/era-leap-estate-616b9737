import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "era_estimation_draft";
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

interface Stored<T> {
  data: T;
  step: number;
  savedAt: number;
}

export function useFormPersistence<T extends Record<string, unknown>>(
  initial: T,
) {
  const [data, setData] = useState<T>(initial);
  const [step, setStep] = useState<number>(1);
  const [hasDraft, setHasDraft] = useState(false);
  const loaded = useRef(false);

  // Détecte un brouillon au montage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Stored<T>;
      if (Date.now() - parsed.savedAt > EXPIRY_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      // brouillon non vide ?
      const hasContent = Object.values(parsed.data ?? {}).some(
        (v) => typeof v === "string" && v.length > 0,
      );
      if (hasContent) setHasDraft(true);
    } catch {
      // ignore
    }
  }, []);

  // Sauvegarde à chaque modification (après acceptation/restauration)
  useEffect(() => {
    if (!loaded.current) return;
    try {
      const payload: Stored<T> = { data, step, savedAt: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [data, step]);

  const restore = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Stored<T>;
      setData({ ...initial, ...parsed.data });
      setStep(parsed.step || 1);
    } catch {
      // ignore
    }
    setHasDraft(false);
    loaded.current = true;
  };

  const discardDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setHasDraft(false);
    loaded.current = true;
  };

  const clear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Active la sauvegarde dès la première interaction (si pas de draft à restaurer)
  const enablePersistence = () => {
    loaded.current = true;
  };

  return {
    data,
    setData,
    step,
    setStep,
    hasDraft,
    restore,
    discardDraft,
    clear,
    enablePersistence,
  };
}
