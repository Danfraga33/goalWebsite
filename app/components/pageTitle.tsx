import React, { ReactNode } from "react";

const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
      {children}
    </h2>
  );
};

export default PageTitle;
