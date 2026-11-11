import { Domain, Floor } from "@/lib/types";
import { floorIcons } from "@/lib/floorMeta";
import { DomainCard } from "@/components/DomainCard";

export function FloorSection({
  floor,
  onSelectDomain,
}: {
  floor: Floor;
  onSelectDomain: (domain: Domain) => void;
}) {
  const Icon = floorIcons[floor.id];

  return (
    <section className="rounded-2xl border-[0.5px] border-gray-200 bg-gray-50/60 p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[0.5px] border-gray-200 bg-white text-gray-500 shadow-sm">
          {Icon && <Icon size={19} stroke={1.75} />}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] font-medium tracking-wide text-gray-400">
              {String(floor.order).padStart(2, "0")}
            </span>
            <h2 className="text-base font-semibold text-gray-900">
              {floor.nameEn} <span className="text-gray-400 font-normal">· {floor.nameKo}</span>
            </h2>
          </div>
          <p className="text-sm text-gray-600">{floor.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {floor.domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} onSelect={onSelectDomain} />
        ))}
      </div>
    </section>
  );
}
