import { Target } from "@/lib/types";
import { TargetCard } from "@/components/TargetCard";

export function ChecklistList({ items, title }: { items: Target[]; title?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {title && <h3 className="text-sm font-medium text-gray-700">{title}</h3>}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <TargetCard key={item.id} target={item} />
        ))}
      </ul>
    </div>
  );
}
