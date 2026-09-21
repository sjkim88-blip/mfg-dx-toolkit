import { Domain } from "@/lib/types";
import { floors } from "@/data/diagnosisData";
import { FloorSection } from "@/components/FloorSection";

export function OrgChartScreen({
  onSelectDomain,
  onOpenAdmin,
}: {
  onSelectDomain: (domain: Domain) => void;
  onOpenAdmin: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">제조업 DX/AX 진단 툴킷</h1>
        <p className="mt-1 text-sm text-gray-500">
          조직도에서 업무분야를 선택해 담당 업무활동의 체크리스트를 채워보세요.
        </p>
      </div>

      {floors
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((floor) => (
          <FloorSection key={floor.id} floor={floor} onSelectDomain={onSelectDomain} />
        ))}

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onOpenAdmin}
          className="rounded-[12px] border-[0.5px] border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          관리자 화면 열기
        </button>
      </div>
    </div>
  );
}
