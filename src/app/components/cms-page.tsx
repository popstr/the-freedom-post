'use client';
export default function CMSPage({
  pageTitle,
  children,
}: {
  pageTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>
      {children}
    </div>
  );
}
