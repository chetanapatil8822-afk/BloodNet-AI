function DonorCard({ donor }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      
      <h2 className="text-xl font-bold">{donor.name}</h2>

      

      <p className="text-gray-600">Blood Group: {donor.bloodGroup}</p>
      <p className="text-gray-600">City: {donor.city}</p>
      <p className="text-gray-600">Distance: {donor.distance}</p>

      <p className="mt-2 text-sm">
        Response Rate: <span className="font-semibold">{donor.responseRate}</span>
      </p>

      <p className={`mt-1 font-semibold ${donor.availability ? "text-green-600" : "text-red-500"}`}>
        {donor.availability ? "Available" : "Not Available"}
      </p>

      

      <div className="mt-4 flex gap-3">
        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          Call
        </button>

        <button className="border border-primary text-primary px-4 py-2 rounded-lg">
          WhatsApp
        </button>
      </div>
    </div>
  );
}

export default DonorCard;