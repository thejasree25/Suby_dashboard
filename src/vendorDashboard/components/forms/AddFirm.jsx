
// AddFirm.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = ({ showFirmsHandler }) => {
  const [firmExists, setFirmExists] = useState(false);
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const firmId = localStorage.getItem("firmId");
    if (firmId) {
      setFirmExists(true);
    }
  }, []);

  if (firmExists) {
    return <h3 style={{ textAlign: "center", color: "red" }}>You have already added a firm.</h3>;
  }

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(category.includes(value) ? category.filter((item) => item !== value) : [...category, value]);
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setRegion(region.includes(value) ? region.filter((item) => item !== value) : [...region, value]);
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        alert("You need to log in first.");
        return;
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      category.forEach((value) => formData.append('category', value));
      region.forEach((value) => formData.append('region', value));
      formData.append('image', file);
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: { 'token': `${loginToken}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setFirmName("");
        setArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setFile(null);
        alert("Firm Added Successfully");
        localStorage.setItem('firmId', data.firmId);
        setFirmExists(true);
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists: Only one firm can be added");
      } else {
        alert("Failed to Add Firm");
      }
    } catch (error) {
      console.error("Failed to add the firm:", error);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3 style={{ alignContent: 'center' }}>Add Firm</h3>
        <label>Firm Name</label>
        <input type="text" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        <label>Area</label>
        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
        <div className="check Inp">
          <label>Category</label>
          <div>
            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} /> Veg
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} /> Non-Veg
          </div>
        </div>
        <label>Offer</label>
        <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} />
        <div className="checkInp">
          <label>Region</label>
          <div>
            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} /> South Indian
            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} /> North Indian
            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} /> Chinese
            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} /> Bakery
          </div>
        </div>
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <button type="submit" className="btnSubmit">Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;