import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
