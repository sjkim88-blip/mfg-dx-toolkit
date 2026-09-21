import { Progress } from "@/lib/types";
import { neutralBadgeClasses, statusBucketClasses } from "@/lib/diagnosisUtils";

export function StatusBadge({
  progress,
  tone = "auto",
}: {
  progress: Progress;
  // "auto": 진행률(bucket)에 따라 배경 진하기가 달라짐
  // "neutral": 진행률과 무관하게 항상 같은 톤 유지 (예: Activity 화면 상단 요약 배지)
  tone?: "auto" | "neutral";
}) {
  const cls = tone === "neutral" ? neutralBadgeClasses : statusBucketClasses[progress.bucket];
  return (
    <span
      className={`inline-flex items-center rounded-[12px] border-[0.5px] ${cls.border} ${cls.bg} ${cls.text} px-2.5 py-1 text-xs whitespace-nowrap`}
    >
      {progress.label}
    </span>
  );
}
