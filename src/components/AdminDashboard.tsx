"use client";

import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { floors } from "@/data/diagnosisData";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { getActivityProgress, getDomainProgress, getFloorProgress } from "@/lib/diagnosisUtils";
import { captureStatusIcons } from "@/lib/captureStatusMeta";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity, Domain, Progress } from "@/lib/types";

function RateHint({ progress }: { progress: Progress }) {
  return (
    <span className="text-[11px] text-gray-400 whitespace-nowrap">
      자동화 {Math.round(progress.autoRate * 100)}% · 미기록 {Math.round(progress.unrecordedRate * 100)}%
    </span>
  );
}

export function AdminDashboard({
  onSelectActivity,
}: {
  onSelectActivity: (activity: Activity, domain: Domain) => void;
}) {
  const { captureStatusMap } = useDiagnosis();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (activityId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(activityId)) next.delete(activityId);
      else next.add(activityId);
      return next;
    });
  };

  const totalTargets = floors.reduce(
    (sum, floor) => sum + getFloorProgress(floor, captureStatusMap).total,
    0
  );
  const totalRecorded = floors.reduce(
    (sum, floor) => sum + getFloorProgress(floor, captureStatusMap).recorded,
    0
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">관리자 화면</h1>
        <p className="mt-1 text-sm text-gray-500">
          Floor → Domain → Activity 계층으로 전체 Target 포착 현황을 확인합니다. 자동화 비율과
          미기록 비율을 함께 표시해 비어있는 영역을 확인할 수 있습니다. Activity를 펼치면 Target별
          세부입력 내용을 볼 수 있습니다.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-[12px] border-[0.5px] border-gray-300 bg-gray-50 p-4">
        <span className="text-sm font-medium text-gray-900">포착된 Target</span>
        <span className="text-lg font-semibold text-gray-900">
          {totalRecorded}/{totalTargets}
        </span>
        <div className="ml-auto h-2 w-40 overflow-hidden rounded-full border-[0.5px] border-gray-300 bg-white">
          <div
            className="h-full bg-gray-800 transition-all"
            style={{ width: `${totalTargets === 0 ? 0 : (totalRecorded / totalTargets) * 100}%` }}
          />
        </div>
      </div>

      {floors
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((floor) => {
          const floorProgress = getFloorProgress(floor, captureStatusMap);
          return (
            <section
              key={floor.id}
              className="rounded-[12px] border-[0.5px] border-gray-300 bg-white p-5"
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  {floor.nameEn} <span className="font-normal text-gray-400">· {floor.nameKo}</span>
                </h2>
                <StatusBadge progress={floorProgress} />
              </div>
              <div className="mb-4">
                <RateHint progress={floorProgress} />
              </div>

              <div className="flex flex-col gap-4">
                {floor.domains.map((domain) => {
                  const domainProgress = getDomainProgress(domain, captureStatusMap);
                  return (
                    <div
                      key={domain.id}
                      className="rounded-[12px] border-[0.5px] border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {domain.name} <span className="font-normal text-gray-400">· {domain.nameEn}</span>
                        </span>
                        <StatusBadge progress={domainProgress} />
                      </div>
                      <div className="mb-3">
                        <RateHint progress={domainProgress} />
                      </div>
                      <div className="flex flex-col gap-2">
                        {domain.activities.map((activity) => {
                          const activityProgress = getActivityProgress(activity, captureStatusMap);
                          const isExpanded = expanded.has(activity.id);
                          return (
                            <div
                              key={activity.id}
                              className="rounded-[12px] border-[0.5px] border-gray-200 bg-white"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                                <button
                                  type="button"
                                  onClick={() => onSelectActivity(activity, domain)}
                                  className="text-left text-sm text-gray-700 hover:underline"
                                >
                                  {activity.name}
                                </button>
                                <span className="flex items-center gap-2">
                                  <RateHint progress={activityProgress} />
                                  <StatusBadge progress={activityProgress} />
                                  <button
                                    type="button"
                                    onClick={() => toggleExpanded(activity.id)}
                                    aria-label={isExpanded ? "Target 목록 접기" : "Target 목록 펼치기"}
                                    className="flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
                                  >
                                    <IconChevronDown
                                      size={14}
                                      stroke={1.75}
                                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                </span>
                              </div>

                              {isExpanded && (
                                <ul className="flex flex-col gap-1.5 border-t-[0.5px] border-gray-100 px-4 py-3">
                                  {activity.targets.map((target) => {
                                    const record = captureStatusMap[target.id];
                                    const status = record?.status ?? "미기록";
                                    const Icon = captureStatusIcons[status];
                                    return (
                                      <li
                                        key={target.id}
                                        className="flex items-center justify-between gap-2 rounded-[12px] bg-gray-50 px-3 py-2"
                                      >
                                        <span className="flex items-center gap-2 text-xs text-gray-700">
                                          <Icon size={14} stroke={1.75} className="text-gray-400" />
                                          {target.name}
                                          <span className="text-gray-400">· {target.dataForm}</span>
                                        </span>
                                        <span className="text-xs text-gray-400">
                                          {status}
                                          {record?.captureDetail ? ` · ${record.captureDetail}` : ""}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
    </div>
  );
}
