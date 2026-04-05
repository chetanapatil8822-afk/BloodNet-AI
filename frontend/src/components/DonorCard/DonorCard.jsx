function DonorCard({ donor }) {

  const today = new Date();

  let statusText = "";
  let statusColor = "";

  if (!donor.lastDonationDate) {
    statusText = donor.availability ? "Available" : "Not Available";
    statusColor = donor.availability ? "text-green-600" : "text-red-500";
  } else {
    const last = new Date(donor.lastDonationDate);
    const diffDays = (today - last) / (1000 * 60 * 60 * 24);

    if (diffDays > 90) {
      statusText = "Available";
      statusColor = "text-green-600";
    } else {
      const remaining = Math.ceil(90 - diffDays);
      statusText = `Eligible in ${remaining} days`;
      statusColor = "text-yellow-600";
    }
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      
      <h2 className="text-xl font-bold">{donor.name}</h2>

      <p className="text-gray-600">Blood Group: {donor.bloodGroup}</p>
      <p className="text-gray-600">City: {donor.city}</p>
      <p className="text-gray-600">Distance: {donor.distance}</p>

      <p className="mt-2 text-sm">
        Response Rate: <span className="font-semibold">{donor.responseRate}</span>
      </p>

      {/* 🔥 UPDATED STATUS UI */}
      <p className={`mt-2 font-semibold ${statusColor}`}>
        {statusText}
      </p>

      {/* 🗓️ Last Donation Date */}
      <p className="text-sm text-gray-500">
        Last Donation: {donor.lastDonationDate 
          ? new Date(donor.lastDonationDate).toDateString() 
          : "Never"}
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