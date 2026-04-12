import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const fetchDonors = async () => {
    try {
      const res = await axios.get("https://bloodnet-ai.onrender.com/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const deleteDonor = async (id) => {
    if (window.confirm("Are you sure you want to remove this donor?")) {
      try {
        await axios.delete(`https://bloodnet-ai.onrender.com/donors/${id}`);
        fetchDonors();
      } catch (err) {
        console.error("Error deleting donor:", err);
      }
    }
  };

  const toggleAvailability = async (donor) => {
    try {
      await axios.put(`https://bloodnet-ai.onrender.com/donors/${donor._id}`, {
        availability: !donor.availability,
      });
      fetchDonors();
    } catch (err) {
      console.error("Error toggling availability:", err);
    }
  };

  const markAsDonated = async (id) => {
    try {
      await axios.put(`https://bloodnet-ai.onrender.com/donors/${id}`, {
        availability: false,
        lastDonationDate: new Date(),
      });
      fetchDonors();
    } catch (err) {
      console.error("Error marking as donated:", err);
    }
  };

  const filteredDonors = donors.filter((d) => {
    return (
      d.name?.toLowerCase().includes(search.toLowerCase()) &&
      d.bloodGroup?.toLowerCase().includes(bloodGroup.toLowerCase()) &&
      d.city?.toLowerCase().includes(city.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Admin <span className="text-red-600">Console</span>
            </h1>
            <p className="text-slate-600 text-sm font-bold mt-1 uppercase tracking-wide">Database Management</p>
          </div>
          <div className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Records: </span>
            <span className="text-xl font-black text-slate-900">{donors.length}</span>
          </div>
        </div>

        {/* 🔍 Filter Bar */}
        <div className="bg-white border-2 border-slate-100 p-5 rounded-[2rem] mb-8 flex flex-col md:flex-row gap-4 shadow-sm">
          <div className="flex-1">
             <input
                type="text"
                placeholder="Search Donor Name..."
                className="w-full bg-slate-50 border-2 border-transparent focus:border-red-100 p-4 rounded-2xl outline-none text-slate-800 font-bold placeholder:text-slate-400 transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          
          <select
            className="md:w-56 bg-slate-50 border-2 border-transparent p-4 rounded-2xl outline-none text-slate-800 font-bold cursor-pointer"
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Filter City..."
            className="md:w-56 bg-slate-50 border-2 border-transparent p-4 rounded-2xl outline-none text-slate-800 font-bold placeholder:text-slate-400"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* 📊 Data Table */}
        <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-100">
                  <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">Donor Details</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Group</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Management Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-50">
                {filteredDonors.map((donor) => {
                  const today = new Date();
                  let statusText = donor.availability ? "Available" : "Not Available";
                  let statusColor = donor.availability ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800";

                  if (!donor.availability && donor.lastDonationDate) {
                    const last = new Date(donor.lastDonationDate);
                    const diffDays = (today - last) / (1000 * 60 * 60 * 24);
                    if (diffDays <= 90) {
                      statusText = `${Math.ceil(90 - diffDays)} Days Left`;
                      statusColor = "bg-amber-100 text-amber-800";
                    }
                  }

                  return (
                    <tr key={donor._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-900 text-base">{donor.name}</div>
                        <div className="text-sm text-slate-500 font-bold">{donor.phone || "No contact"}</div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-xl font-black text-sm shadow-sm">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-700 font-black uppercase tracking-tight">
                        {donor.city}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColor}`}>
                          {statusText}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center gap-3">
                          {/* Toggle Button */}
                          <button
                            onClick={() => toggleAvailability(donor)}
                            className="flex flex-col items-center gap-1 p-2 min-w-[65px] bg-blue-50 text-blue-700 rounded-2xl hover:bg-blue-100 transition-all active:scale-95 border border-blue-100"
                          >
                            <span className="text-lg">🔄</span>
                            <span className="text-[9px] font-black uppercase">Toggle</span>
                          </button>

                          {/* Donated Button */}
                          <button
                            onClick={() => markAsDonated(donor._id)}
                            className="flex flex-col items-center gap-1 p-2 min-w-[65px] bg-emerald-50 text-emerald-700 rounded-2xl hover:bg-emerald-100 transition-all active:scale-95 border border-emerald-100"
                          >
                            <span className="text-lg">✅</span>
                            <span className="text-[9px] font-black uppercase">Done</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteDonor(donor._id)}
                            className="flex flex-col items-center gap-1 p-2 min-w-[65px] bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100"
                          >
                            <span className="text-lg">🗑️</span>
                            <span className="text-[9px] font-black uppercase">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;