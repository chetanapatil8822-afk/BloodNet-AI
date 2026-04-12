import { useState, useEffect } from "react";
import axios from "axios";
import DonorCard from "../../components/DonorCard/DonorCard";
import { useLocation } from "react-router-dom";

function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const emergencyData = location.state || null;

  // Fetch Donors Logic
  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        let res;
        if (emergencyData?.bloodGroup && emergencyData?.city) {
          // AI/ML MATCHING MODE
          res = await axios.post("https://bloodnet-ai.onrender.com/match-donors", emergencyData);
        } else {
          // NORMAL MODE
          res = await axios.get("https://bloodnet-ai.onrender.com/donors");
        }
        setDonors(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, [emergencyData]);

  const isEligible = (donor) => {
    if (!donor.lastDonationDate) return donor.availability;

    const last = new Date(donor.lastDonationDate);
    const today = new Date();

    const diffDays = (today - last) / (1000 * 60 * 60 * 24);

    return diffDays >= 90 && donor.availability;
  };

  // ✅ SINGLE SOURCE OF TRUTH
  const eligibleDonors = donors.filter(isEligible);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20">
      
      {/* 1. Dynamic Header Section */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {emergencyData ? (
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 animate-pulse">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  AI-Powered Priority Search
                </div>
              ) : (
                <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                  Donor Directory
                </div>
              )}
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Verified <span className="text-red-600">Donors</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                {emergencyData 
                  ? `Showing best matches for ${emergencyData.bloodGroup} in ${emergencyData.city}`
                  : "Connecting you with life-savers across the nation."}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 border-l-0 md:border-l border-gray-100 md:pl-8">
              <div>
                {/* ✅ FIXED */}
                <p className="text-2xl font-bold text-gray-900">{eligibleDonors.length}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Results</p>
              </div>
              <div>
                {/* ✅ FIXED */}
                <p className="text-2xl font-bold text-emerald-500">
                  {eligibleDonors.length}
                </p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        
        {loading ? (
          /* Professional Loading State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400 font-medium">Analyzing donor database...</p>
          </div>
        ) : (
          <>
            {eligibleDonors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ✅ FIXED */}
                {eligibleDonors.map((donor) => (
                  <div key={donor._id} className="transform transition-all hover:-translate-y-1">
                    <DonorCard donor={donor} />
                  </div>
                ))}
              </div>
            ) : (
              /* Professional Empty State */
              <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800">No Matching Donors Found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto px-6">
                  Try broadening your search or contact the nearest blood bank for immediate assistance.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 text-red-600 font-bold hover:underline"
                >
                  Refresh Search
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Global Footer (Clean) */}
      <footer className="mt-20 text-center">
        <div className="inline-block p-1 bg-gray-50 rounded-full px-4 border border-gray-100">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Showing real-time verified results from BloodNet Database
          </p>
        </div>
      </footer>
    </div>
  );
}

export default FindDonor;