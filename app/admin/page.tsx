"use client";

import { useEffect, useState } from "react";

interface WaitlistEntry {
  id: number;
  email: string;
  created_at: string;
  source: string;
}

export default function AdminPage() {
  const [emails, setEmails] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/admin/waitlist");
      const data = await response.json();
      setEmails(data.emails || []);
      setStats(data.stats || { total: 0, today: 0, thisWeek: 0 });
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    const csvContent = [
      "Email,Date Joined,Source",
      ...emails.map(
        (entry) =>
          `${entry.email},${new Date(entry.created_at).toLocaleDateString()},${
            entry.source
          }`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campus-loop-waitlist-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#66b5f6]">
        <div className="text-center bg-white p-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000]">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-['Outfit',Helvetica] font-normal text-black">
            Loading waitlist data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#66b5f6] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white font-['Outfit',Helvetica] [text-shadow:4px_4px_0px_#000000] [-webkit-text-stroke:1px_#000000] mb-2">
            CampusLoop Waitlist Admin
          </h1>
          <p className="text-black font-['Outfit',Helvetica]">
            Manage your waitlist and prepare for launch
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000]">
            <h3 className="font-['Outfit',Helvetica] font-bold text-black text-lg mb-2">
              Total Signups
            </h3>
            <div className="text-3xl font-bold text-[#66b5f6] font-['Outfit',Helvetica]">
              {stats.total}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000]">
            <h3 className="font-['Outfit',Helvetica] font-bold text-black text-lg mb-2">
              Today
            </h3>
            <div className="text-3xl font-bold text-[#66b5f6] font-['Outfit',Helvetica]">
              {stats.today}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000]">
            <h3 className="font-['Outfit',Helvetica] font-bold text-black text-lg mb-2">
              This Week
            </h3>
            <div className="text-3xl font-bold text-[#66b5f6] font-['Outfit',Helvetica]">
              {stats.thisWeek}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-6">
          <button
            onClick={exportEmails}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fff826] rounded-lg border-2 border-solid border-black shadow-[4px_4px_0px_#000000] hover:translate-y-0 transition-transform duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#000000] font-['Outfit',Helvetica] font-normal text-black"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Email List */}
        <div className="bg-white rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] p-6">
          <h2 className="font-['Outfit',Helvetica] font-bold text-black text-xl mb-4">
            Waitlist Entries
          </h2>

          {emails.length === 0 ? (
            <p className="text-gray-500 text-center py-8 font-['Outfit',Helvetica]">
              No emails collected yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 font-['Outfit',Helvetica] font-bold">
                      Email
                    </th>
                    <th className="text-left py-3 font-['Outfit',Helvetica] font-bold">
                      Date Joined
                    </th>
                    <th className="text-left py-3 font-['Outfit',Helvetica] font-bold">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emails.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-200">
                      <td className="py-3 font-['Roboto',Helvetica]">
                        {entry.email}
                      </td>
                      <td className="py-3 font-['Roboto',Helvetica]">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 font-['Roboto',Helvetica]">
                        {entry.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
