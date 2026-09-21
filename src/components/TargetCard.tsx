"use client";

import { useState } from "react";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import { CAPTURE_STATUSES, CaptureStatus, Target } from "@/lib/types";
import { useDiagnosis } from "@/context/DiagnosisContext";
import { captureStatusShades } from "@/lib/diagnosisUtils";
import { captureDetailPlaceholders, captureStatusIcons } from "@/lib/captureStatusMeta";

export function TargetCard({ target }: { target: Target }) {
  const { getCapture, setCapture } = useDiagnosis();
  const saved = getCapture(target.id);

  const [editing, setEditing] = useState(saved.status === "미기록");
  const [draftStatus, setDraftStatus] = useState<CaptureStatus>(saved.status);
  const [draftDetail, setDraftDetail] = useState(saved.captureDetail ?? "");

  const isDirty =
    draftStatus !== saved.status || draftDetail !== (saved.captureDetail ?? "");
  const needsDetail = draftStatus !== "미기록";
  const canSave = draftStatus === "미기록" || draftDetail.trim().length > 0;

  const Icon = captureStatusIcons[saved.status];

  function openEditing() {
    setDraftStatus(saved.status);
    setDraftDetail(saved.captureDetail ?? "");
    setEditing(true);
  }

  function handleSelect(status: CaptureStatus) {
    setDraftStatus(status);
    if (status === "미기록") setDraftDetail("");
  }

  function handleSave() {
    if (!canSave) return;
    setCapture(target.id, draftStatus, draftStatus === "미기록" ? undefined : draftDetail.trim());
    if (draftStatus !== "미기록") setEditing(false);
  }

  function handleCancel() {
    setDraftStatus(saved.status);
    setDraftDetail(saved.captureDetail ?? "");
    setEditing(false);
  }

  const isRecorded = saved.status !== "미기록";

  return (
    <li
      className={`flex flex-col gap-3 rounded-2xl border-[0.5px] p-4 shadow-sm transition-all ${
        isRecorded
          ? "border-gray-200 bg-gradient-to-b from-white to-gray-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[0.5px] ${
              isRecorded
                ? "border-gray-300 bg-gray-100 text-gray-600"
                : "border-gray-200 bg-white text-gray-400"
            }`}
          >
            <Icon size={18} stroke={1.75} />
          </span>
          <span className={`text-[15px] font-medium ${isRecorded ? "text-gray-900" : "text-gray-600"}`}>
            {target.name}
          </span>
        </div>
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-400">
          {target.dataForm}
        </span>
      </div>

      {!editing ? (
        <div className="flex items-center justify-between gap-2 pl-12">
          <span className="text-xs text-gray-500">
            {saved.status}
            {saved.captureDetail ? ` · ${saved.captureDetail}` : ""}
          </span>
          <button
            type="button"
            onClick={openEditing}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
          >
            <IconPencil size={12} stroke={1.75} />
            수정
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {CAPTURE_STATUSES.map((option) => {
              const selected = option === draftStatus;
              const isConfirmed = selected && !isDirty;
              const shade = captureStatusShades[option];
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`rounded-xl border px-2 py-1.5 text-xs transition-all ${
                    isConfirmed
                      ? `${shade.bg} ${shade.text} ${shade.border} shadow-sm`
                      : selected
                        ? "border-dashed border-gray-400 bg-white text-gray-700"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {needsDetail && (
            <input
              type="text"
              value={draftDetail}
              onChange={(e) => setDraftDetail(e.target.value)}
              placeholder={captureDetailPlaceholders[draftStatus]}
              className="animate-[fade-in_0.15s_ease-out] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100"
            />
          )}

          <div className="flex items-center justify-end gap-2">
            {saved.status !== "미기록" && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl px-3 py-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600"
              >
                취소
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="inline-flex items-center gap-1 rounded-xl bg-gray-900 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
            >
              <IconCheck size={14} stroke={2} />
              저장
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
