function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-lightRed to-white">
      
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
        Find Blood Donors Instantly
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        AI-powered platform to connect donors and save lives during emergencies
      </p>

      <div className="mt-8 space-x-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primaryDark shadow-md">
          Find Donor
        </button>

        <button className="border border-primary text-primary px-6 py-3 rounded-lg text-lg hover:bg-lightRed">
          Register as Donor
        </button>
      </div>

    </div>
  );
}

<div className="py-16 px-8 bg-white">
  <h2 className="text-3xl font-bold text-center mb-10">
    How It Works
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-semibold mb-2">Search Donor</h3>
      <p className="text-gray-600">
        Find blood donors based on blood group and location.
      </p>
    </div>

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
      <p className="text-gray-600">
        Get best donors using AI-based ranking system.
      </p>
    </div>

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm text-center">
      <h3 className="text-xl font-semibold mb-2">Contact Instantly</h3>
      <p className="text-gray-600">
        Call or message donors instantly in emergency.
      </p>
    </div>

  </div>
</div>
export default Home;