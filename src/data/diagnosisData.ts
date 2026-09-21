import { Activity, DataForm, Domain, Floor, Target } from "@/lib/types";

// 원본 데이터는 한글 라벨 중심으로 유지해 나중에 쉽게 수정할 수 있게 하고,
// id는 빌더 함수가 계층 구조를 바탕으로 자동 생성한다.
// targets는 [이름, 데이터형태] 튜플로 정의한다.
type RawTarget = [string, DataForm];

interface RawActivity {
  name: string;
  targets: RawTarget[];
}

interface RawDomain {
  name: string;
  nameEn: string;
  slug: string;
  activities: RawActivity[];
}

interface RawFloor {
  id: string;
  order: number;
  nameKo: string;
  nameEn: string;
  description: string;
  domains: RawDomain[];
}

const rawFloors: RawFloor[] = [
  {
    id: "shopfloor",
    order: 1,
    nameKo: "제조현장",
    nameEn: "Shop Floor",
    description: "생산·설비·품질 등 실제 제조 활동이 이루어지는 영역",
    domains: [
      {
        name: "생산",
        nameEn: "Production",
        slug: "production",
        activities: [
          {
            name: "작업 준비",
            targets: [
              ["작업지시", "정형"],
              ["작업표준", "비정형"],
              ["자재 준비", "정형"],
              ["설비 설정", "정형"],
            ],
          },
          {
            name: "공정 운영",
            targets: [
              ["작업 수행방식", "비정형"],
              ["조업조건", "정형"],
              ["공정 상태", "정형"],
              ["이상조치", "비정형"],
            ],
          },
          {
            name: "생산실적 관리",
            targets: [
              ["생산량", "정형"],
              ["작업시간", "정형"],
              ["자재 투입량", "정형"],
              ["정지·대기", "반정형"],
            ],
          },
        ],
      },
      {
        name: "설비",
        nameEn: "Equipment",
        slug: "equipment",
        activities: [
          {
            name: "설비 현황관리",
            targets: [
              ["설비 식별정보", "정형"],
              ["설비 구성", "정형"],
              ["사양·매뉴얼", "비정형"],
            ],
          },
          {
            name: "설비 상태관리",
            targets: [
              ["가동 상태", "정형"],
              ["운전값", "정형"],
              ["알람", "반정형"],
              ["상태 측정값", "정형"],
            ],
          },
          {
            name: "보전관리",
            targets: [
              ["점검기록", "반정형"],
              ["고장이력", "반정형"],
              ["정비작업", "반정형"],
              ["교체부품", "정형"],
            ],
          },
        ],
      },
      {
        name: "품질",
        nameEn: "Quality",
        slug: "quality",
        activities: [
          {
            name: "검사관리",
            targets: [
              ["검사기준", "정형"],
              ["검사방식", "정형"],
              ["측정값·이미지", "비정형"],
              ["판정 결과", "정형"],
            ],
          },
          {
            name: "부적합 관리",
            targets: [
              ["불량유형", "정형"],
              ["발생 수량", "정형"],
              ["처리·재작업", "반정형"],
              ["원인·조치", "비정형"],
            ],
          },
          {
            name: "제품 이력관리",
            targets: [
              ["제품·로트 식별", "정형"],
              ["투입자재 이력", "반정형"],
              ["공정이력", "반정형"],
              ["검사이력", "반정형"],
            ],
          },
        ],
      },
      {
        name: "현장 물류",
        nameEn: "Internal Logistics",
        slug: "logistics",
        activities: [
          {
            name: "자재 입출고",
            targets: [
              ["입고·출고 실적", "정형"],
              ["자재 식별", "정형"],
              ["수량·중량", "정형"],
            ],
          },
          {
            name: "재공·이동관리",
            targets: [
              ["재공 수량", "정형"],
              ["보관 위치", "정형"],
              ["공정 간 이동", "반정형"],
              ["인계·인수", "반정형"],
            ],
          },
          {
            name: "출하작업",
            targets: [
              ["포장", "정형"],
              ["출하 식별", "정형"],
              ["상차", "정형"],
              ["출고 확인", "정형"],
            ],
          },
        ],
      },
      {
        name: "안전·환경·에너지",
        nameEn: "Safety, Environment & Energy",
        slug: "safety-env-energy",
        activities: [
          {
            name: "안전관리",
            targets: [
              ["안전점검", "반정형"],
              ["위험작업", "반정형"],
              ["사고·아차사고", "비정형"],
              ["대응조치", "비정형"],
            ],
          },
          {
            name: "환경관리",
            targets: [
              ["배출 측정", "정형"],
              ["폐수·폐기물", "정형"],
              ["방지시설 상태", "정형"],
            ],
          },
          {
            name: "에너지·유틸리티 관리",
            targets: [
              ["사용량", "정형"],
              ["공급 상태", "정형"],
              ["사용처", "정형"],
              ["이상·손실", "반정형"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rnd",
    order: 2,
    nameKo: "연구개발",
    nameEn: "R&D Floor",
    description: "제품·소재·공정을 개발하고 실험·시험하는 영역",
    domains: [
      {
        name: "제품·소재",
        nameEn: "Product & Material",
        slug: "product-material",
        activities: [
          {
            name: "요구사항 관리",
            targets: [
              ["고객 요구", "비정형"],
              ["목표 성능", "정형"],
              ["적용 규격", "정형"],
            ],
          },
          {
            name: "제품·소재 설계",
            targets: [
              ["제품 사양", "정형"],
              ["도면", "비정형"],
              ["소재·성분", "정형"],
              ["배합", "정형"],
            ],
          },
          {
            name: "설계 변경관리",
            targets: [
              ["변경내용", "비정형"],
              ["버전", "정형"],
              ["승인", "반정형"],
              ["적용 대상", "정형"],
            ],
          },
        ],
      },
      {
        name: "공정기술",
        nameEn: "Process Engineering",
        slug: "process-engineering",
        activities: [
          {
            name: "공정 설계",
            targets: [
              ["공정 경로", "정형"],
              ["작업방법", "비정형"],
              ["설비 요구사항", "정형"],
            ],
          },
          {
            name: "조건 개발",
            targets: [
              ["공정변수", "정형"],
              ["레시피", "정형"],
              ["실험조건", "정형"],
              ["결과 비교", "반정형"],
            ],
          },
          {
            name: "시험생산·양산 이관",
            targets: [
              ["시험생산 실적", "정형"],
              ["검증 결과", "정형"],
              ["표준조건", "정형"],
              ["현장 인계", "비정형"],
            ],
          },
        ],
      },
      {
        name: "시험·분석",
        nameEn: "Testing & Analysis",
        slug: "testing-analysis",
        activities: [
          {
            name: "시험 준비",
            targets: [
              ["시료 식별", "정형"],
              ["시험 항목", "정형"],
              ["시험방법", "비정형"],
              ["시험장비", "정형"],
            ],
          },
          {
            name: "시험 수행",
            targets: [
              ["시험조건", "정형"],
              ["원시 측정값", "정형"],
              ["관찰·이미지", "비정형"],
            ],
          },
          {
            name: "결과 관리",
            targets: [
              ["분석 결과", "정형"],
              ["판정", "정형"],
              ["시험보고서", "비정형"],
              ["제품·시료 연결", "정형"],
            ],
          },
        ],
      },
      {
        name: "연구지식",
        nameEn: "Research Knowledge",
        slug: "research-knowledge",
        activities: [
          {
            name: "연구기록 관리",
            targets: [
              ["연구과제", "정형"],
              ["연구노트", "비정형"],
              ["실험이력", "반정형"],
              ["결과보고서", "비정형"],
            ],
          },
          {
            name: "기술자료 관리",
            targets: [
              ["기술문서", "비정형"],
              ["논문·특허", "비정형"],
              ["외부 자료", "비정형"],
              ["문서 버전", "정형"],
            ],
          },
          {
            name: "지식 활용",
            targets: [
              ["검색", "반정형"],
              ["과거 사례", "비정형"],
              ["노하우", "비정형"],
              ["재사용·공유", "반정형"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "office",
    order: 3,
    nameKo: "사무업무",
    nameEn: "Office Floor",
    description: "구매·영업·계획·재무 등 사업을 운영하는 영역",
    domains: [
      {
        name: "영업·고객",
        nameEn: "Sales & Customer",
        slug: "sales-customer",
        activities: [
          {
            name: "고객·영업관리",
            targets: [
              ["고객정보", "정형"],
              ["영업기회", "정형"],
              ["상담이력", "반정형"],
            ],
          },
          {
            name: "견적·수주관리",
            targets: [
              ["견적", "정형"],
              ["가격조건", "정형"],
              ["계약", "비정형"],
              ["주문·변경", "반정형"],
            ],
          },
          {
            name: "고객 대응",
            targets: [
              ["납기 조회", "정형"],
              ["고객 요청", "비정형"],
              ["클레임", "비정형"],
              ["대응이력", "반정형"],
            ],
          },
        ],
      },
      {
        name: "구매·공급망",
        nameEn: "Procurement & Supply Chain",
        slug: "procurement-supply",
        activities: [
          {
            name: "조달관리",
            targets: [
              ["구매요청", "정형"],
              ["견적 비교", "반정형"],
              ["발주", "정형"],
              ["입고예정", "정형"],
            ],
          },
          {
            name: "협력사 관리",
            targets: [
              ["공급 품목", "정형"],
              ["계약조건", "비정형"],
              ["공급능력", "정형"],
              ["품질·납기 실적", "정형"],
            ],
          },
          {
            name: "외주관리",
            targets: [
              ["외주발주", "정형"],
              ["사급자재", "정형"],
              ["외주 진행", "반정형"],
              ["입고·정산", "정형"],
            ],
          },
        ],
      },
      {
        name: "계획·물류",
        nameEn: "Planning & Logistics",
        slug: "planning-logistics",
        activities: [
          {
            name: "수요·생산계획",
            targets: [
              ["수요·판매계획", "정형"],
              ["생산능력", "정형"],
              ["자재 소요", "정형"],
              ["생산일정", "정형"],
            ],
          },
          {
            name: "재고관리",
            targets: [
              ["가용재고", "정형"],
              ["안전재고", "정형"],
              ["수불", "반정형"],
              ["장기·불용재고", "정형"],
            ],
          },
          {
            name: "배송·수출입 관리",
            targets: [
              ["출하계획", "정형"],
              ["배송추적", "반정형"],
              ["수출입 서류", "비정형"],
              ["통관·물류비", "정형"],
            ],
          },
        ],
      },
      {
        name: "재무·원가",
        nameEn: "Finance & Cost",
        slug: "finance-cost",
        activities: [
          {
            name: "회계관리",
            targets: [
              ["매입·매출", "정형"],
              ["전표", "정형"],
              ["채권·채무", "정형"],
              ["결산", "정형"],
            ],
          },
          {
            name: "원가관리",
            targets: [
              ["원가 집계 대상", "정형"],
              ["재료비", "정형"],
              ["노무비·제조경비", "정형"],
              ["배부 기준", "정형"],
            ],
          },
          {
            name: "손익·자금관리",
            targets: [
              ["부문·제품별 손익", "정형"],
              ["예산·실적", "정형"],
              ["수금·지급", "정형"],
              ["자금계획", "정형"],
            ],
          },
        ],
      },
      {
        name: "인사·업무지원",
        nameEn: "HR & Business Support",
        slug: "hr-support",
        activities: [
          {
            name: "인사·역량관리",
            targets: [
              ["조직·직무", "정형"],
              ["인력·근태", "정형"],
              ["교육", "반정형"],
              ["숙련·역량", "비정형"],
            ],
          },
          {
            name: "문서·승인관리",
            targets: [
              ["업무문서", "비정형"],
              ["양식", "정형"],
              ["결재", "반정형"],
              ["보관·검색", "반정형"],
            ],
          },
          {
            name: "지원업무 관리",
            targets: [
              ["지원 요청", "정형"],
              ["계약·행정", "비정형"],
              ["업무 배정", "정형"],
              ["처리이력", "반정형"],
            ],
          },
        ],
      },
      {
        name: "정보시스템",
        nameEn: "Information Systems",
        slug: "information-systems",
        activities: [
          {
            name: "시스템 현황관리",
            targets: [
              ["보유 시스템", "정형"],
              ["사용 기능", "정형"],
              ["사용자", "정형"],
              ["운영 담당", "정형"],
            ],
          },
          {
            name: "시스템 연결관리",
            targets: [
              ["연결 대상", "정형"],
              ["전달 정보", "정형"],
              ["전달 방식", "정형"],
              ["연동 오류", "반정형"],
            ],
          },
          {
            name: "데이터·운영관리",
            targets: [
              ["기준정보", "정형"],
              ["접근권한", "정형"],
              ["데이터 품질", "반정형"],
              ["장애·백업", "반정형"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "topfloor",
    order: 4,
    nameKo: "경영 의사결정",
    nameEn: "Top Floor",
    description: "전략·투자·성과·주요 의사결정을 담당하는 영역",
    domains: [
      {
        name: "전략·성과",
        nameEn: "Strategy & Performance",
        slug: "strategy-performance",
        activities: [
          {
            name: "사업계획 수립",
            targets: [
              ["사업목표", "정형"],
              ["시장·고객 전망", "비정형"],
              ["사업·제품 방향", "비정형"],
            ],
          },
          {
            name: "성과관리",
            targets: [
              ["경영지표", "정형"],
              ["목표·실적", "정형"],
              ["전망", "비정형"],
              ["지표 산출 근거", "비정형"],
            ],
          },
          {
            name: "경영검토",
            targets: [
              ["보고자료", "비정형"],
              ["차이·원인", "비정형"],
              ["개선 결정", "반정형"],
              ["실행 결과", "반정형"],
            ],
          },
        ],
      },
      {
        name: "투자·전환",
        nameEn: "Investment & Transformation",
        slug: "investment-transformation",
        activities: [
          {
            name: "개선과제 관리",
            targets: [
              ["현안", "비정형"],
              ["개선목표", "정형"],
              ["대상 업무", "정형"],
              ["기대효과", "비정형"],
            ],
          },
          {
            name: "투자 검토",
            targets: [
              ["구축·운영비", "정형"],
              ["경제성", "정형"],
              ["선행조건", "비정형"],
              ["우선순위", "정형"],
            ],
          },
          {
            name: "추진·확산관리",
            targets: [
              ["추진 일정", "정형"],
              ["수행인력·파트너", "정형"],
              ["적용 범위", "정형"],
              ["효과 검증", "반정형"],
            ],
          },
        ],
      },
      {
        name: "위험·의사결정",
        nameEn: "Risk & Decision-making",
        slug: "risk-decision",
        activities: [
          {
            name: "위험관리",
            targets: [
              ["공급·생산 위험", "반정형"],
              ["재무 위험", "반정형"],
              ["조기경보", "반정형"],
              ["대응계획", "비정형"],
            ],
          },
          {
            name: "의사결정 관리",
            targets: [
              ["판단 기준", "비정형"],
              ["근거 정보", "비정형"],
              ["승인 주체", "정형"],
              ["실행 권한", "정형"],
            ],
          },
          {
            name: "후속조치 관리",
            targets: [
              ["조치 담당", "정형"],
              ["실행 상태", "정형"],
              ["예외 보고", "비정형"],
              ["조치 결과", "반정형"],
            ],
          },
        ],
      },
      {
        name: "조직·거버넌스",
        nameEn: "Organization & Governance",
        slug: "org-governance",
        activities: [
          {
            name: "추진체계 관리",
            targets: [
              ["책임조직", "정형"],
              ["역할", "정형"],
              ["필요 역량", "비정형"],
              ["변화관리", "비정형"],
            ],
          },
          {
            name: "데이터 책임관리",
            targets: [
              ["데이터 책임자", "정형"],
              ["공통 정의", "비정형"],
              ["품질 기준", "정형"],
              ["공유·접근 정책", "비정형"],
            ],
          },
          {
            name: "AI 활용관리",
            targets: [
              ["적용 업무", "정형"],
              ["평가 기준", "정형"],
              ["사람의 검토", "반정형"],
              ["운영 책임", "정형"],
            ],
          },
        ],
      },
    ],
  },
];

function buildFloor(raw: RawFloor): Floor {
  const domains: Domain[] = raw.domains.map((rawDomain) => {
    const domainId = `${raw.id}-${rawDomain.slug}`;
    const activities: Activity[] = rawDomain.activities.map((rawActivity, activityIndex) => {
      const activityId = `${domainId}-a${activityIndex + 1}`;
      const targets: Target[] = rawActivity.targets.map(([name, dataForm], targetIndex) => ({
        id: `${activityId}-t${targetIndex + 1}`,
        name,
        dataForm,
      }));
      return { id: activityId, name: rawActivity.name, targets };
    });
    return { id: domainId, name: rawDomain.name, nameEn: rawDomain.nameEn, activities };
  });

  return {
    id: raw.id,
    order: raw.order,
    nameKo: raw.nameKo,
    nameEn: raw.nameEn,
    description: raw.description,
    domains,
  };
}

export const floors: Floor[] = rawFloors.map(buildFloor);

interface DomainEntry {
  floor: Floor;
  domain: Domain;
}
interface ActivityEntry {
  floor: Floor;
  domain: Domain;
  activity: Activity;
}

const domainIndex = new Map<string, DomainEntry>();
const activityIndex = new Map<string, ActivityEntry>();

for (const floor of floors) {
  for (const domain of floor.domains) {
    domainIndex.set(domain.id, { floor, domain });
    for (const activity of domain.activities) {
      activityIndex.set(activity.id, { floor, domain, activity });
    }
  }
}

export function getFloorById(id: string): Floor | undefined {
  return floors.find((f) => f.id === id);
}

export function getDomainById(id: string): Domain | undefined {
  return domainIndex.get(id)?.domain;
}

export function getFloorByDomainId(id: string): Floor | undefined {
  return domainIndex.get(id)?.floor;
}

export function getActivityById(id: string): Activity | undefined {
  return activityIndex.get(id)?.activity;
}

export function getDomainByActivityId(id: string): Domain | undefined {
  return activityIndex.get(id)?.domain;
}

export function getFloorByActivityId(id: string): Floor | undefined {
  return activityIndex.get(id)?.floor;
}

export function getAllTargetIds(): string[] {
  return floors.flatMap((floor) =>
    floor.domains.flatMap((domain) =>
      domain.activities.flatMap((activity) => activity.targets.map((t) => t.id))
    )
  );
}
