import AdminNavbar from "./_Utils/admin-navbar";

export default function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex bg-gray-400 flex-col min-h-screen">
        <div className="flex-grow flex items-start h-full">
          <AdminNavbar />
          <div className="flex-1 p-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
