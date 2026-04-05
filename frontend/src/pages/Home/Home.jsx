import { FaSearch, FaPhoneAlt, FaTint } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";   // ✅ ADD THIS

function Home() {
  return (
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-br from-lightRed to-white">

        {/* LEFT */}
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Find Blood Donors Instantly
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            AI-powered network to connect donors and save lives during emergencies.
          </p>

          <div className="mt-8 space-x-4">

            {/* ✅ FIND DONOR BUTTON */}
            <Link to="/find-donor">
              <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primaryDark shadow-md">
                Find Donor
              </button>
            </Link>

            {/* ✅ REGISTER BUTTON */}
            <Link to="/register">
              <button className="border border-primary text-primary px-6 py-3 rounded-lg text-lg hover:bg-lightRed">
                Register as Donor
              </button>
            </Link>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="mt-10 md:mt-0">
          <img
            src="/blood-donation.png"
            alt="Blood Donation"
            className="w-[400px]"
          />
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 px-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <FaSearch className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Donor</h3>
            <p className="text-gray-600">
              Find blood donors based on blood group and location.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <FaTint className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
            <p className="text-gray-600">
              Get best donors using AI-based ranking system.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
            <FaPhoneAlt className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Contact Instantly</h3>
            <p className="text-gray-600">
              Call or message donors instantly in emergency.
            </p>
          </div>

        </div>
      </section>


      {/* ================= EMERGENCY REQUEST ================= */}
      <section className="px-10 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Recent Emergency Requests
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">

          {/* LEFT */}
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaTint className="text-red-500" />
              Urgent B+ Blood Needed
            </h3>

            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <MdLocationOn /> City Hospital, Mumbai
            </p>

            <p className="text-gray-500 mt-2">
              Rajesh, in Mumbai; urgent requirement.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                High
              </span>

              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryDark">
                View Donors
              </button>
            </div>
          </div>

          {/* RIGHT MAP IMAGE */}
          <img
            src="/map.png"
            alt="map"
            className="w-[250px] mt-6 md:mt-0 rounded-lg"
          />
        </div>
      </section>

      {/* ================= WHY DONATE BLOOD ================= */}
<section className="px-10 py-20 bg-white flex justify-center">

  <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl">
    
    {/* LEFT IMAGE */}
    <div>
      <img
        src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/1030715c-36e1-40f9-a9b9-0b4a676ba03e.png"
        alt="Hands holding blood drop"
        className="w-[350px] md:w-[420px]"
      />
    </div>

    {/* RIGHT TEXT */}
    <div className="max-w-xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Why Should You Donate Blood?
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        Blood donation is a simple act that can save multiple lives. Every unit of blood donated can help patients undergoing surgeries, trauma care, cancer treatment, and chronic illnesses.
      </p>

      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        Donating blood not only helps others but also benefits your own health. It helps in maintaining healthy iron levels, improves blood circulation, and promotes the production of new blood cells.
      </p>

      <p className="text-gray-600 text-lg leading-relaxed">
        In emergencies, timely availability of blood can mean the difference between life and death. By donating blood, you become a vital part of a life-saving network and contribute to a healthier and stronger community.
      </p>
    </div>

  </div>

</section>
    </div>
  );
}

export default Home;