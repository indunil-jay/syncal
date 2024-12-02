export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full p-4 ">
      <div className="h-full bg-white grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-neutral-100 w-full h-full rounded-md hidden lg:grid">
          {/* slider TODO:*/}
        </div>
        <div className="overflow-auto hide-scrollbar h-auto">{children}</div>
      </div>
    </div>
  );
}
