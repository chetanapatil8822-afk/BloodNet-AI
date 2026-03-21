import { useState } from "react";
import donorsData from "../../utils/dummyDonors";
import DonorCard from "../../components/DonorCard/DonorCard";

function FindDonor() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  const filteredDonors = donorsData.filter((d) => {
    return (
      d.bloodGroup.toLowerCase().includes(search.toLowerCase()) &&
      d.city.toLowerCase().includes(city.toLowerCase())
    );
  });

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Blood Donors
      </h1>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        
        <input
          type="text"
          placeholder="Search Blood Group (e.g. O+)"
          className="border p-3 rounded-lg w-full md:w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter City"
          className="border p-3 rounded-lg w-full md:w-1/3"
          onChange={(e) => setCity(e.target.value)}
        />

      </div>

      <p className="text-center mb-4 text-gray-600">
  Showing {filteredDonors.length} donors
</p>

      {/* Donor List */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No donors found
          </p>
        )}
      </div>

    </div>
  );
}

export default FindDonor;