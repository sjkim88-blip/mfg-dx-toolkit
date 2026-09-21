// 4단계 진단 체계: Floor(업무영역) > Domain(업무분야) > Activity(업무활동) > Target(진단대상)

// 데이터형태 — 고정 메타데이터 (항목 성격에 따라 사전 분류)
export type DataForm = "정형" | "반정형" | "비정형";

// 포착방식 — 사용자가 직접 선택하는 값 (기본값: 미기록)
export type CaptureStatus = "미기록" | "수기기록" | "시스템입력(수동)" | "자동센싱·기록";

export const CAPTURE_STATUSES: CaptureStatus[] = [
  "미기록",
  "수기기록",
  "시스템입력(수동)",
  "자동센싱·기록",
];

export interface Target {
  id: string;
  name: string;
  dataForm: DataForm;
}

export interface Activity {
  id: string;
  name: string;
  targets: Target[];
}

export interface Domain {
  id: string;
  name: string;
  nameEn: string;
  activities: Activity[];
}

export interface Floor {
  id: string;
  order: number;
  nameKo: string;
  nameEn: string;
  description: string;
  domains: Domain[];
}

// 진단 상태 (브라우저 메모리) — targetId -> 포착방식 + 세부입력
// captureDetail은 captureStatus가 '미기록'이 아닐 때만 값을 가진다.
// Target 자체는 정적 카탈로그이므로 여기 담지 않고, 세션 상태로 따로 관리한다.
export interface CaptureRecord {
  status: CaptureStatus;
  captureDetail?: string;
}

export type CaptureStatusMap = Record<string, CaptureRecord>;

export type StatusBucket = "empty" | "partial" | "complete";

export interface Progress {
  bucket: StatusBucket;
  recorded: number;
  total: number;
  fraction: number;
  label: string;
  autoRate: number; // '자동센싱·기록' 비율
  unrecordedRate: number; // '미기록' 비율
}
