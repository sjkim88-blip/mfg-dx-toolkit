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
      </div>

      <div className="rounded-[12px] border-[0.5px] border-gray-300 bg-white p-5">
        <ChecklistList items={activity.targets} />
      </div>
    </div>
  );
}
