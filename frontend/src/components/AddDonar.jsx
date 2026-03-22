import { useState } from "react";
import axios from "axios";

function AddDonor() {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    phone: "",
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/donors", formData);
      alert(`Donor ${res.data.name} added successfully!`);
      setFormData({
        name: "",
        bloodGroup: "",
        city: "",
        phone: "",
        availability: true,
      });
    } catch (err) {
      console.error(err);
      alert("Error adding donor");
    }
  };

  return (
    <div>
      <h2>Add Donor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label>
          Available:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Donor</button>
      </form>
    </div>
  );
}

export default AddDonor;