"use client";

import { Activity, Domain } from "@/lib/types";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { getActivityProgress } from "@/lib/diagnosisUtils";
import { StatusBadge } from "@/components/StatusBadge";
import { ChecklistList } from "@/components/ChecklistList";

export function ActivityScreen({ activity, domain }: { activity: Activity; domain: Domain }) {
  const { captureStatusMap } = useDiagnosis();
  const progress = getActivityProgress(activity, captureStatusMap);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-400">{domain.name}</span>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-lg font-semibold text-gray-900">{activity.name}</h1>
          <StatusBadge progress={progress} tone="neutral" />
        </div>
        <p className="text-xs text-gray-400">
          각 Target의 현재 포착방식을 기록하고, 데이터 플랫폼·에이전트 구축에 필요한 우선순위·활용목적도 함께 남겨보세요.
        </p>
      </div>

      <div className="rounded-2xl border-[0.5px] border-gray-200 bg-white p-5 shadow-sm">
        <ChecklistList items={activity.targets} />
      </div>
    </div>
  );
}
