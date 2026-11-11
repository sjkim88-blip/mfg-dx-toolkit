"use client";

import { IconListCheck } from "@tabler/icons-react";
import { Activity, Domain } from "@/lib/types";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { getActivityProgress } from "@/lib/diagnosisUtils";
import { StatusBadge } from "@/components/StatusBadge";

export function DomainScreen({
  domain,
  onSelectActivity,
}: {
  domain: Domain;
  onSelectActivity: (activity: Activity) => void;
}) {
  const { captureStatusMap } = useDiagnosis();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[0.5px] border-gray-200 bg-white text-gray-500 shadow-sm">
          <IconListCheck size={19} stroke={1.75} />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{domain.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {domain.nameEn} · 업무활동 {domain.activities.length}개를 선택해 체크리스트를 확인하세요.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {domain.activities.map((activity) => {
          const progress = getActivityProgress(activity, captureStatusMap);
          return (
            <button
              key={activity.id}
              type="button"
              onClick={() => onSelectActivity(activity)}
              className="flex flex-col items-start gap-2 rounded-2xl border-[0.5px] border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-sm font-medium text-gray-900">{activity.name}</span>
              <span className="text-xs text-gray-400">Target {activity.targets.length}개</span>
              <StatusBadge progress={progress} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
