import { IconCircleDashed, IconCpu, IconFileText, IconKeyboard, Icon } from "@tabler/icons-react";
import { CaptureStatus } from "@/lib/types";

// captureStatus별 아이콘 — 전부 그레이 톤(currentColor)으로만 사용
export const captureStatusIcons: Record<CaptureStatus, Icon> = {
  미기록: IconCircleDashed,
  수기기록: IconFileText,
  "시스템입력(수동)": IconKeyboard,
  "자동센싱·기록": IconCpu,
};

// '미기록'이 아닌 값을 선택했을 때 보여줄 세부입력 placeholder
export const captureDetailPlaceholders: Partial<Record<CaptureStatus, string>> = {
  수기기록: "어떤 방식으로 기록하나요? (예: 종이 대장, 엑셀 파일)",
  "시스템입력(수동)": "어떤 시스템에 입력하나요? (예: 자체 ERP, 엑셀 공유시트)",
  "자동센싱·기록": "어떤 설비·경로로 수집되나요? (예: PLC, 바코드 스캐너)",
};
