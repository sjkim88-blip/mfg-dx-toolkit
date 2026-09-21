"use client";

import { useState } from "react";
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

  const handleSelectDomain = (domain: Domain) => {
    push({ kind: "domain", domainId: domain.id });
  };

  const handleSelectActivity = (activity: Activity) => {
    push({ kind: "activity", activityId: activity.id });
  };

  return (
    <DiagnosisProvider>
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-4 px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Breadcrumb stack={stack} onJump={jumpTo} />
          <BackButton disabled={stack.length <= 1} onClick={goBack} />
        </div>

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
      </div>
    </DiagnosisProvider>
  );
}
