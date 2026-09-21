"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CaptureRecord, CaptureStatus, CaptureStatusMap } from "@/lib/types";

const DEFAULT_RECORD: CaptureRecord = { status: "미기록" };

interface DiagnosisContextValue {
  captureStatusMap: CaptureStatusMap;
  getCapture: (targetId: string) => CaptureRecord;
  setCapture: (targetId: string, status: CaptureStatus, captureDetail?: string) => void;
}

const DiagnosisContext = createContext<DiagnosisContextValue | null>(null);

export function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [captureStatusMap, setCaptureStatusMap] = useState<CaptureStatusMap>({});

  const setCapture = useCallback((targetId: string, status: CaptureStatus, captureDetail?: string) => {
    setCaptureStatusMap((prev) => ({
      ...prev,
      [targetId]:
        status === "미기록" ? { status } : { status, captureDetail: captureDetail || undefined },
    }));
  }, []);

  const getCapture = useCallback(
    (targetId: string): CaptureRecord => captureStatusMap[targetId] ?? DEFAULT_RECORD,
    [captureStatusMap]
  );

  const value = useMemo(
    () => ({ captureStatusMap, getCapture, setCapture }),
    [captureStatusMap, getCapture, setCapture]
  );

  return <DiagnosisContext.Provider value={value}>{children}</DiagnosisContext.Provider>;
}

export function useDiagnosis() {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error("useDiagnosis must be used within DiagnosisProvider");
  return ctx;
}
