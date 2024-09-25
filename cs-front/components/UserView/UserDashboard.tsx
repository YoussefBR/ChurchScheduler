"use client";

import { CalendlyEmbed } from "@/components/UserView/CalendlyEmbed";

export const UserDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CalendlyEmbed />
        </div>
      </main>
    </div>
  );
}
