import { Domain, Floor } from "@/lib/types";
import { DomainCard } from "@/components/DomainCard";

export function FloorSection({
  floor,
  onSelectDomain,
}: {
  floor: Floor;
  onSelectDomain: (domain: Domain) => void;
}) {
  return (
    <section className="rounded-[12px] border-[0.5px] border-gray-300 bg-gray-50 p-5">
      <div className="mb-4 flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-medium tracking-wide text-gray-400">
            {String(floor.order).padStart(2, "0")}
          </span>
          <h2 className="text-base font-semibold text-gray-900">
            {floor.nameEn} <span className="text-gray-400 font-normal">· {floor.nameKo}</span>
          </h2>
        </div>
        <p className="text-sm text-gray-600">{floor.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {floor.domains.map((domain) => (
          <DomainCard key={domain.id} domain={domain} onSelect={onSelectDomain} />
        ))}
      </div>
    </section>
  );
}
