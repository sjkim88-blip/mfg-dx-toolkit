import {
  Icon,
  IconBriefcase2,
  IconBuildingFactory2,
  IconBuildingSkyscraper,
  IconFlask2,
} from "@tabler/icons-react";

// Floor별 아이콘 — 전부 그레이 톤(currentColor)으로만 사용
export const floorIcons: Record<string, Icon> = {
  shopfloor: IconBuildingFactory2,
  rnd: IconFlask2,
  office: IconBriefcase2,
  topfloor: IconBuildingSkyscraper,
};
