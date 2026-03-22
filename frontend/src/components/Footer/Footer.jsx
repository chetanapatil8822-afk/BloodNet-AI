function Footer() {
  return (
    <footer className="bg-gray-100 px-10 py-10 mt-10">
        <div className="grid md:grid-cols-4 gap-8 text-gray-700">

          <div>
            <h3 className="font-bold text-lg mb-3">BloodNet AI</h3>
            <p className="text-sm">
              BloodNet AI connects donors instantly using AI to save lives during emergencies.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <p>Find Donor</p>
            <p>Become a Donor</p>
            <p>Emergency Requests</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">Blood Info</h3>
            <p>Who Can Donate?</p>
            <p>Donation Guidelines</p>
          </div>

          
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          © 2026 BloodNet AI | Save Lives ❤️
        </div>
      </footer>

  );
}

export default Footer;