"use client";

import { Screen, screenKey } from "@/lib/navigation";
import { getActivityById, getDomainById } from "@/data/diagnosisData";

function labelForScreen(screen: Screen): string {
  switch (screen.kind) {
    case "root":
      return "전체 조직도";
    case "domain":
      return getDomainById(screen.domainId)?.name ?? "업무분야";
    case "activity":
      return getActivityById(screen.activityId)?.name ?? "업무활동";
    case "admin":
      return "관리자 화면";
  }
}

export function Breadcrumb({
  stack,
  onJump,
}: {
  stack: Screen[];
  onJump: (index: number) => void;
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm">
      {stack.map((screen, index) => {
        const isLast = index === stack.length - 1;
        return (
          <span key={screenKey(screen) + index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-gray-300">/</span>}
            <button
              type="button"
              disabled={isLast}
              onClick={() => onJump(index)}
              className={
                isLast
                  ? "font-medium text-gray-900 cursor-default"
                  : "text-gray-400 hover:text-gray-700 transition-colors"
              }
            >
              {labelForScreen(screen)}
            </button>
          </span>
        );
      })}
    </nav>
  );
}
