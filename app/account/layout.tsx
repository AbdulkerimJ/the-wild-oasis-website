import SideNavigation from "../_components/SideNavigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-8 h-full min-h-0 overflow-hidden">
      <SideNavigation />
      <div className="overflow-auto">{children}</div>
    </div>
  );
}
