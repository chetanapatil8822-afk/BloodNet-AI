import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-50 border-t-2 border-slate-100 py-16 px-6 md:px-20 font-sans">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Column 1: Branding */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="font-black text-2xl text-slate-900 tracking-tighter">
            <span className="text-red-600">🩸</span> BloodNet<span className="text-red-600">AI</span>
          </h3>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-xs">
            Connecting life-savers instantly. Using smart technology to bridge the gap between donors and those in need.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center space-y-3">
          <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] mb-2">Navigation</h3>
          <Link to="/find-donor" className="text-slate-600 font-bold text-sm hover:text-red-600 transition-colors">Find Donor</Link>
          <Link to="/signup" className="text-slate-600 font-bold text-sm hover:text-red-600 transition-colors">Become a Donor</Link>
          <Link to="/emergency" className="text-slate-600 font-bold text-sm hover:text-red-600 transition-colors">Emergency Requests</Link>
        </div>

        {/* Column 3: Resources */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] mb-2">Support</h3>
          <p className="text-slate-600 font-bold text-sm hover:text-red-600 cursor-pointer transition-colors">Who Can Donate?</p>
          <p className="text-slate-600 font-bold text-sm hover:text-red-600 cursor-pointer transition-colors">Donation Guidelines</p>
          <p className="text-slate-600 font-bold text-sm hover:text-red-600 cursor-pointer transition-colors">Contact Us</p>
        </div>

      </div>

      {/* Divider Line */}
      <div className="max-w-6xl mx-auto h-[1px] bg-slate-200 mt-12 mb-8"></div>

      {/* Bottom Line */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-xs font-black uppercase tracking-widest text-slate-400 gap-4">
        <p>© 2026 BloodNet AI</p>
        <div className="flex items-center gap-2">
            <span>Built to save lives</span>
            <span className="text-red-500 text-lg animate-pulse">❤️</span>
        </div>
        <p>Privacy Policy</p>
      </div>

    </footer>
  );
}

export default Footer;