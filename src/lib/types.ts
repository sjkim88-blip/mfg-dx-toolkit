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

// 데이터 플랫폼 구축 관점에서 보는 추가 메타데이터 — 전부 사용자가 직접 입력(선택)
export type Priority = "높음" | "중간" | "낮음";
export const PRIORITIES: Priority[] = ["높음", "중간", "낮음"];

export type DataFrequency = "실시간" | "일단위" | "주단위" | "월단위" | "비정기";
export const DATA_FREQUENCIES: DataFrequency[] = [
  "실시간",
  "일단위",
  "주단위",
  "월단위",
  "비정기",
];

// 진단 상태 (브라우저 메모리) — targetId -> 포착방식 + 세부입력 + 플랫폼 메타데이터
// captureDetail은 captureStatus가 '미기록'이 아닐 때만 값을 가진다.
// priority/frequency/purpose/ownerSystem은 상태와 무관하게 선택 입력 가능
// (미기록이어도 "중요하지만 아직 못 모으고 있다"를 표시할 수 있어야 하므로).
// Target 자체는 정적 카탈로그이므로 여기 담지 않고, 세션 상태로 따로 관리한다.
export interface CaptureRecord {
  status: CaptureStatus;
  captureDetail?: string;
  priority?: Priority;
  frequency?: DataFrequency;
  purpose?: string;
  ownerSystem?: string;
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
