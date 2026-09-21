export type Screen =
  | { kind: "root" }
  | { kind: "domain"; domainId: string }
  | { kind: "activity"; activityId: string }
  | { kind: "admin" };

export function screenKey(screen: Screen): string {
  switch (screen.kind) {
    case "root":
      return "root";
    case "domain":
      return `domain:${screen.domainId}`;
    case "activity":
      return `activity:${screen.activityId}`;
    case "admin":
      return "admin";
  }
}
