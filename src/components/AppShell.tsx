"use client";

import { useState } from "react";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { Screen } from "@/lib/navigation";
import { Domain, Activity } from "@/lib/types";
import {
  getActivityById,
  getDomainById,
  getDomainByActivityId,
} from "@/data/diagnosisData";
import { DiagnosisProvider } from "@/context/DiagnosisContext";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BackButton } from "@/components/BackButton";
import { OrgChartScreen } from "@/components/OrgChartScreen";
import { DomainScreen } from "@/components/DomainScreen";
import { ActivityScreen } from "@/components/ActivityScreen";
import { AdminDashboard } from "@/components/AdminDashboard";

export function AppShell() {
  const [stack, setStack] = useState<Screen[]>([{ kind: "root" }]);
  const current = stack[stack.length - 1];

  const push = (screen: Screen) => setStack((prev) => [...prev, screen]);
  const goBack = () => setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const jumpTo = (index: number) => setStack((prev) => prev.slice(0, index + 1));
  const goRoot = () => setStack([{ kind: "root" }]);

  const handleSelectDomain = (domain: Domain) => {
    push({ kind: "domain", domainId: domain.id });
  };

  const handleSelectActivity = (activity: Activity) => {
    push({ kind: "activity", activityId: activity.id });
  };

  return (
    <DiagnosisProvider>
      <div className="min-h-screen bg-[var(--background)]">
        <header className="sticky top-0 z-10 border-b-[0.5px] border-gray-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={goRoot}
              className="flex items-center gap-2 self-start text-left transition-opacity hover:opacity-70"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900 text-white">
                <IconLayoutDashboard size={16} stroke={1.9} />
              </span>
              <span className="text-sm font-semibold tracking-tight text-gray-900">
                제조업 DX/AX 진단 툴킷
              </span>
            </button>
            <div className="flex items-center justify-between gap-3">
              <Breadcrumb stack={stack} onJump={jumpTo} />
              <BackButton disabled={stack.length <= 1} onClick={goBack} />
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6">
          {current.kind === "root" && (
            <OrgChartScreen
              onSelectDomain={handleSelectDomain}
              onOpenAdmin={() => push({ kind: "admin" })}
            />
          )}

          {current.kind === "domain" &&
            (() => {
              const domain = getDomainById(current.domainId);
              if (!domain) return null;
              return <DomainScreen domain={domain} onSelectActivity={handleSelectActivity} />;
            })()}

          {current.kind === "activity" &&
            (() => {
              const activity = getActivityById(current.activityId);
              const domain = getDomainByActivityId(current.activityId);
              if (!activity || !domain) return null;
              return <ActivityScreen activity={activity} domain={domain} />;
            })()}

          {current.kind === "admin" && (
            <AdminDashboard
              onSelectActivity={(activity) => push({ kind: "activity", activityId: activity.id })}
            />
          )}
        </main>
      </div>
    </DiagnosisProvider>
  );
}
