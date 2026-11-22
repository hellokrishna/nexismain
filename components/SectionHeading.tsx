export function SectionHeading({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime">{index}</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      <div className="mt-4 max-w-xl text-lg leading-8 text-muted">{children}</div>
    </div>
  );
}
