export function DashboardCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-md">
      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}
