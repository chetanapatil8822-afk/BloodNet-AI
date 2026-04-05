function Footer() {
  return (
    <footer className="bg-gray-100 py-12 mt-10">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-gray-700 text-center md:text-left">
        
        {/* Column 1 */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="font-semibold text-lg">BloodNet AI</h3>
          <p className="text-sm max-w-xs">
            BloodNet AI connects donors instantly using AI to save lives during emergencies.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center space-y-2">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <p className="hover:text-red-500 cursor-pointer">Find Donor</p>
          <p className="hover:text-red-500 cursor-pointer">Become a Donor</p>
          <p className="hover:text-red-500 cursor-pointer">Emergency Requests</p>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <h3 className="font-semibold text-lg">Blood Info</h3>
          <p className="hover:text-red-500 cursor-pointer">Who Can Donate?</p>
          <p className="hover:text-red-500 cursor-pointer">Donation Guidelines</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © 2026 BloodNet AI | Save Lives ❤️
      </div>

    </footer>
  );
}

export default Footer;