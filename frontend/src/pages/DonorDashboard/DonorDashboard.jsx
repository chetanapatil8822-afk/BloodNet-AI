import { useEffect, useState } from "react";
import axios from "axios";

function DonorDashboard() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const toggleAvailability = async (donor) => {
    try {
      await axios.put(`http://localhost:5000/donors/${donor._id}`, {
        availability: !donor.availability,
      });
      fetchDonors();
    } catch (err) {
      console.error("Error updating availability:", err);
    }
  };

  const markAsDonated = async (id) => {
    try {
      await axios.put(`http://localhost:5000/donors/${id}`, {
        availability: false,
        lastDonationDate: new Date(),
      });
      fetchDonors();
    } catch (err) {
      console.error("Error marking donation:", err);
    }
  };

  const filteredDonors = donors.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.phone?.includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
              Donor <span className="text-red-600">Management</span>
            </h1>
            <p className="text-slate-500 mt-1">Track and update verified blood donors</p>
          </div>

          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-slate-700 font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Summary (Optional Visuals) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Donors</p>
            <p className="text-3xl font-bold text-slate-800">{donors.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Available Now</p>
            <p className="text-3xl font-bold text-slate-800">{donors.filter(d => d.availability).length}</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-100 text-slate-600">
                  <th className="px-6 py-4 font-semibold text-sm">Donor Name</th>
                  <th className="px-6 py-4 font-semibold text-sm">Blood Group</th>
                  <th className="px-6 py-4 font-semibold text-sm">Location</th>
                  <th className="px-6 py-4 font-semibold text-sm">Status</th>
                  <th className="px-6 py-4 font-semibold text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <tr key={donor._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{donor.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{donor.phone || "No phone"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-md font-bold text-sm border border-red-100">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {donor.city}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 font-semibold text-sm ${donor.availability ? "text-emerald-600" : "text-slate-400"}`}>
                          <span className={`h-2 w-2 rounded-full ${donor.availability ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`}></span>
                          {donor.availability ? "Ready to Donate" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => toggleAvailability(donor)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                              donor.availability 
                              ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50" 
                              : "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {donor.availability ? "Set Busy" : "Set Available"}
                          </button>
                          
                          <button
                            onClick={() => markAsDonated(donor._id)}
                            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-all shadow-md active:scale-95"
                          >
                            Mark Donated
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-20 text-slate-400 font-medium">
                      No donors found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-slate-400 text-sm italic">
          BloodNet AI Management System • Secure Data Access
        </footer>
      </div>
    </div>
  );
}

export default DonorDashboard;