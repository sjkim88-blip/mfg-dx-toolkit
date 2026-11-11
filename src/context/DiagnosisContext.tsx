"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CaptureRecord, CaptureStatusMap } from "@/lib/types";

const DEFAULT_RECORD: CaptureRecord = { status: "미기록" };

interface DiagnosisContextValue {
  captureStatusMap: CaptureStatusMap;
  getCapture: (targetId: string) => CaptureRecord;
  setCapture: (targetId: string, record: CaptureRecord) => void;
}

const DiagnosisContext = createContext<DiagnosisContextValue | null>(null);

function cleanRecord(record: CaptureRecord): CaptureRecord {
  return {
    status: record.status,
    captureDetail: record.status === "미기록" ? undefined : record.captureDetail || undefined,
    priority: record.priority || undefined,
    frequency: record.frequency || undefined,
    purpose: record.purpose?.trim() || undefined,
    ownerSystem: record.ownerSystem?.trim() || undefined,
  };
}

export function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [captureStatusMap, setCaptureStatusMap] = useState<CaptureStatusMap>({});

  const setCapture = useCallback((targetId: string, record: CaptureRecord) => {
    setCaptureStatusMap((prev) => ({
      ...prev,
      [targetId]: cleanRecord(record),
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
