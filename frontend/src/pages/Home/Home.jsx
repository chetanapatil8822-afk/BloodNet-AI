import { FaSearch, FaPhoneAlt, FaTint, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  const compatibilityData = [
    { type: "A+", give: "A+, AB+", receive: "A+, A-, O+, O-" },
    { type: "O+", give: "O+, A+, B+, AB+", receive: "O+, O-" },
    { type: "B+", give: "B+, AB+", receive: "B+, B-, O+, O-" },
    { type: "AB+", give: "AB+ Only", receive: "Everyone (Universal)" },
    { type: "A-", give: "A+, A-, AB+, AB-", receive: "A-, O-" },
    { type: "O-", give: "Everyone (Universal)", receive: "O- Only" },
    { type: "B-", give: "B+, B-, AB+, AB-", receive: "B-, O-" },
    { type: "AB-", give: "AB+, AB-", receive: "AB-, A-, B-, O-" },
  ];

  return (
    <div className="bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION - Seamless transition */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-20 pb-16 bg-gradient-to-b from-red-50 via-white to-white">
        <div className="max-w-2xl z-10 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
            Find Blood Donors <span className="text-red-600 italic">Instantly.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 font-medium max-w-lg mx-auto md:mx-0">
            A smart network connecting life-savers. Fast, reliable, and powered by the community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Link to="/find-donor">
              <button className="bg-red-600 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-red-700 shadow-xl shadow-red-200 transition-all active:scale-95">
                Find Donor
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl text-base font-bold hover:border-red-600 hover:text-red-600 transition-all active:scale-95">
                Join as Donor
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-12 md:mt-0 relative">
          <div className="absolute -inset-10 bg-red-100/50 rounded-full blur-3xl"></div>
          <img src="/blood-donation.png" alt="Blood Donation" className="w-[320px] md:w-[480px] relative z-10 drop-shadow-2xl" />
        </div>
      </section>

      {/* 2. HOW IT WORKS - Tightened spacing */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-black tracking-tight">How It <span className="text-red-600">Works</span></h2>
              <p className="text-slate-500 font-medium mt-2">Three simple steps to save a life.</p>
            </div>
            <div className="h-1 bg-slate-100 flex-1 mx-10 mb-4 hidden md:block rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaSearch />, title: "Search", desc: "Filter by group & location." },
              { icon: <FaTint />, title: "Match", desc: "Get AI-ranked donor list." },
              { icon: <FaPhoneAlt />, title: "Connect", desc: "Contact donors instantly." }
            ].map((item, index) => (
              <div key={index} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY DONATE - Overlapping design for connectivity */}
      <section className="py-16 px-6 md:px-20 bg-slate-900 rounded-[3rem] mx-4 md:mx-10 my-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/1030715c-36e1-40f9-a9b9-0b4a676ba03e.png"
              alt="Donate"
              className="w-full max-w-md mx-auto drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            />
          </div>
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-4xl font-black mb-6 leading-tight">Your Blood, <br/><span className="text-red-500">Their Second Chance.</span></h2>
            <div className="space-y-4">
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                A single donation can save up to three lives. It’s not just blood; it’s a heartbeat for someone else.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                {["Healthier Heart", "New Cell Growth", "Free Checkup", "Save Lives"].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-sm text-slate-200">
                    <FaCheckCircle className="text-red-500" /> {benefit}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 border-l-2 border-red-500 pl-4 italic text-sm">
                Emergency availability can be the difference between life and death.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BLOOD COMPATIBILITY GUIDE (Compact Version) */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Blood Compatibility <span className="text-red-600">Guide</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm">Quick reference for donors and recipients.</p>
          </div>

          {/* Compact Table Container */}
          <div className="bg-white border-2 border-slate-50 rounded-[2rem] overflow-hidden shadow-sm max-w-3xl mx-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Give To</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Receive From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {compatibilityData.map((item, index) => (
                  <tr key={index} className="hover:bg-red-50/40 transition-colors">
                    <td className="px-6 py-3 font-black text-red-600 text-lg">{item.type}</td>
                    <td className="px-6 py-3 text-slate-600 font-medium">{item.give}</td>
                    <td className="px-6 py-3 text-slate-600 font-medium">{item.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Compact CTA */}
<div className="mt-12 p-2 bg-slate-900 rounded-[2rem] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto overflow-hidden">
  
  <p className="text-white font-bold px-6 py-6 text-sm">
    Ready to make a difference?
  </p>

  <Link to="/signup" className="w-full sm:w-auto">
    <button className="w-full bg-red-600 text-white px-8 py-4 rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all">
      Become a Donor Now
    </button>
  </Link>

</div>
        </div>
      </section>
    </div>
  );
}

export default Home;