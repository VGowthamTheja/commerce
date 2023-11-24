import React from "react";
import { AdminPanel } from "../../page";
import Image from "next/image";

const AdminNavbar = () => {
  return (
    <aside className="flex-shrink-0 w-64 bg-gray-800 min-h-sreen">
      <div className="flex flex-col h-full">
        <div className="flex p-3 items-center justify-center h-14 relative flex-shrink-0">
          <Image
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
            fill
          />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          {AdminPanel.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              <div className="flex items-center justify-center h-4 w-4 text-white">
                {item.icon}
              </div>
              <span className="ml-3 text-white">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AdminNavbar;
