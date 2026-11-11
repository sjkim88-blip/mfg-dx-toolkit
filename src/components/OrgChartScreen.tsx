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

      <div className="rounded-[12px] border-[0.5px] border-gray-300 bg-white p-4">
        <h2 className="text-sm font-medium text-gray-900">왜 이 진단을 하나요?</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          이 툴킷은 도메인별 데이터 플랫폼과 AI 에이전트를 만들기 위한 <strong className="font-medium text-gray-800">첫 단계, 즉 &ldquo;도메인 이해&rdquo; 단계</strong>입니다.
          현장에 어떤 데이터가 실제로 존재하는지, 지금은 어떤 방식(수기·시스템·자동센싱)으로 모이고 있는지,
          그리고 어디가 비어있는지를 먼저 파악해야 플랫폼·에이전트를 어디서부터 구축할지 우선순위를 정할 수 있습니다.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          Target(진단대상)마다 포착방식을 기록하고, 필요하면 <strong className="font-medium text-gray-800">우선순위·발생주기·활용목적·담당 시스템</strong> 같은
          데이터 플랫폼 관점의 정보도 함께 남겨두세요. 관리자 화면에서 전체 현황과 &ldquo;우선순위는 높은데 아직 못 모으고 있는&rdquo;
          핵심 공백을 한눈에 확인할 수 있습니다.
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
