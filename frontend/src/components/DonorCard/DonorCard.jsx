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

  // 🔥 NEW LOGIC (IMPORTANT)
  const isAvailable = statusText === "Available";
  const hasValidPhone = donor.phone && donor.phone.length === 10;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      
      <h2 className="text-xl font-bold">{donor.name}</h2>

      <p className="text-gray-600">Blood Group: {donor.bloodGroup}</p>

      <p className="text-gray-600 text-sm">
        📍 {[donor.city, donor.district, donor.state]
          .filter(Boolean)
          .join(", ")}
      </p>

      <p className="text-gray-600">Distance: {donor.distance}</p>

      <p className="mt-2 text-sm">
        Response Rate: <span className="font-semibold">{donor.responseRate}</span>
      </p>

      {/* 🔥 STATUS */}
      <p className={`mt-2 font-semibold ${statusColor}`}>
        {statusText}
      </p>

      {/* 🗓️ Last Donation */}
      <p className="text-sm text-gray-500">
        Last Donation: {donor.lastDonationDate 
          ? new Date(donor.lastDonationDate).toDateString() 
          : "Never"}
      </p>

      {/* 🚀 BUTTONS */}
      <div className="mt-4 flex gap-3">
        
        {/* 📞 Call */}
        <button
          disabled={!isAvailable || !hasValidPhone}
          onClick={() => {
            if (!hasValidPhone) {
              alert("Phone number not available");
              return;
            }
            window.location.href = `tel:${donor.phone}`;
          }}
          className={`px-4 py-2 rounded-lg text-white ${
            isAvailable && hasValidPhone
              ? "bg-primary"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Call
        </button>

        {/* 💬 WhatsApp */}
        <button
          disabled={!isAvailable || !hasValidPhone}
          onClick={() => {
            if (!hasValidPhone) {
              alert("Phone number not available");
              return;
            }

            const phone = donor.phone.startsWith("91")
              ? donor.phone
              : `91${donor.phone}`;

            const message = `Hi ${donor.name}, I found you on Blood Donation App. Are you available to donate ${donor.bloodGroup} blood in ${donor.city}? 🙏`;

            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            window.open(url, "_blank");
          }}
          className={`px-4 py-2 rounded-lg border ${
            isAvailable && hasValidPhone
              ? "border-primary text-primary"
              : "border-gray-400 text-gray-400 cursor-not-allowed"
          }`}
        >
          WhatsApp
        </button>

      </div>
    </div>
  );
}

export default DonorCard;