"use client";

import { Domain } from "@/lib/types";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { getDomainProgress, statusBucketClasses } from "@/lib/diagnosisUtils";

export function DomainCard({
  domain,
  onSelect,
}: {
  domain: Domain;
  onSelect: (domain: Domain) => void;
}) {
  const { captureStatusMap } = useDiagnosis();
  const progress = getDomainProgress(domain, captureStatusMap);
  const dot = statusBucketClasses[progress.bucket];
  const activityCount = domain.activities.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(domain)}
      className="flex flex-col items-start gap-2 rounded-[12px] border-[0.5px] border-gray-300 bg-white p-4 text-left transition-colors hover:bg-gray-50"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-900">{domain.name}</span>
        <span className={`h-2 w-2 rounded-full ${dot.bg} border-[0.5px] ${dot.border}`} aria-hidden />
      </div>
      <span className="text-xs text-gray-500">{domain.nameEn}</span>
      <span className="text-xs text-gray-400">
        업무활동 {activityCount}개 · Target {progress.recorded}/{progress.total} 포착됨
      </span>
    </button>
  );
}
