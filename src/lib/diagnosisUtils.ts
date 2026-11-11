import {
  Activity,
  CaptureStatus,
  CaptureStatusMap,
  Domain,
  Floor,
  Priority,
  Progress,
  Target,
} from "@/lib/types";

function toProgress(targets: Target[], statuses: CaptureStatusMap): Progress {
  const total = targets.length;
  let recorded = 0;
  let auto = 0;
  let unrecorded = 0;

  for (const target of targets) {
    const status = statuses[target.id]?.status ?? "미기록";
    if (status === "미기록") {
      unrecorded += 1;
    } else {
      recorded += 1;
      if (status === "자동센싱·기록") auto += 1;
    }
  }

  const fraction = total === 0 ? 0 : recorded / total;
  const bucket = recorded === 0 ? "empty" : fraction >= 1 ? "complete" : "partial";

  return {
    bucket,
    recorded,
    total,
    fraction,
    label: recorded === 0 ? "미시작" : `${recorded}/${total} 포착됨`,
    autoRate: total === 0 ? 0 : auto / total,
    unrecordedRate: total === 0 ? 0 : unrecorded / total,
  };
}

export function getActivityProgress(activity: Activity, statuses: CaptureStatusMap): Progress {
  return toProgress(activity.targets, statuses);
}

export function getDomainProgress(domain: Domain, statuses: CaptureStatusMap): Progress {
  return toProgress(
    domain.activities.flatMap((a) => a.targets),
    statuses
  );
}

export function getFloorProgress(floor: Floor, statuses: CaptureStatusMap): Progress {
  return toProgress(
    floor.domains.flatMap((d) => d.activities.flatMap((a) => a.targets)),
    statuses
  );
}

// 우선순위 '높음'인데 아직 '미기록'인 항목 수 — 데이터 플랫폼 구축 시 가장 먼저 메워야 할 공백
export function countCriticalGaps(targets: Target[], statuses: CaptureStatusMap): number {
  return targets.filter((t) => {
    const record = statuses[t.id];
    return (record?.status ?? "미기록") === "미기록" && record?.priority === "높음";
  }).length;
}

// 색상 대신 배경 진하기로만 상태를 구분한다
export const statusBucketClasses: Record<
  Progress["bucket"],
  { bg: string; text: string; border: string }
> = {
  empty: { bg: "bg-white", text: "text-gray-400", border: "border-gray-200" },
  partial: { bg: "bg-gray-200", text: "text-gray-700", border: "border-gray-300" },
  complete: { bg: "bg-gray-800", text: "text-white", border: "border-gray-800" },
};

// 진행률과 무관하게 항상 같은 톤을 유지하는 중립 배지 (예: Activity 화면 상단 요약 배지)
export const neutralBadgeClasses = {
  bg: "bg-[var(--surface-1)]",
  text: "text-[var(--text-secondary)]",
  border: "border-gray-300",
};

// 포착방식 4단계도 색상 없이 배경 진하기만으로 구분한다 (미기록 -> 자동센싱·기록 순으로 진해짐)
export const captureStatusShades: Record<
  CaptureStatus,
  { bg: string; text: string; border: string }
> = {
  미기록: { bg: "bg-white", text: "text-gray-400", border: "border-gray-300" },
  수기기록: { bg: "bg-gray-300", text: "text-gray-800", border: "border-gray-300" },
  "시스템입력(수동)": { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" },
  "자동센싱·기록": { bg: "bg-gray-800", text: "text-white", border: "border-gray-800" },
};

// 우선순위도 색상 없이 배경 진하기만으로 구분한다 (낮음 -> 높음 순으로 진해짐)
export const priorityShades: Record<Priority, { bg: string; text: string; border: string }> = {
  낮음: { bg: "bg-gray-200", text: "text-gray-700", border: "border-gray-300" },
  중간: { bg: "bg-gray-500", text: "text-white", border: "border-gray-500" },
  높음: { bg: "bg-gray-800", text: "text-white", border: "border-gray-800" },
};
