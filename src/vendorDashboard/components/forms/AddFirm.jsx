import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = ({ showFirmsHandler }) => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
        const loginToken = localStorage.getItem('loginToken');
        
        if (!loginToken) {
            console.error("User not authenticated");
            alert("You need to log in first.");
            return;
        }

        const formData = new FormData();
        formData.append('firmName', firmName);
        formData.append('area', area);
        formData.append('offer', offer);
        category.forEach((value )=> {
          formData.append('category', value);
        });
        region.forEach((value )=> {
          formData.append('region', value);
        });
        formData.append('image', file);

        const response = await fetch(`${API_URL}/firm/add-firm`, {
            method: 'POST',
            headers: {
                'token': `${loginToken}`
            },
            body: formData
        });

        const data = await response.json();
        console.log("API Response:", data); 
        if (response.ok) {
          // console.log("API Response:", data);  // ✅ Debugging

           

            // ✅ Reset values after successful submission
            setFirmName("");
            setArea("");
            setOffer("");
            setCategory([]);
            setRegion([]);
            setFile(null);
            alert("Firm Added Successfully");
           
        }
        else if(data.message=="vendor can have only one firm"){
          alert("Firm Exists Only 1 firm can be added")
        }
        else{
          alert("Failed to Add Firm")
        }
        console.log("this is firm id",data.firmId)
          const mango=data.firmId;
          localStorage.setItem('firmId',mango); 
    } catch (error) {
        console.error("failed to add the firm:", error);
    }
};

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3 style={{alignContent:'center'}}>Add Firm</h3>

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
