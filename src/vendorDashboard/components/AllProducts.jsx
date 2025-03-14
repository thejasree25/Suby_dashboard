import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';
import "./AllProducts.css"; // Importing CSS file

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData);
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert("Failed to fetch products");
        }
    };

    useEffect(() => {
        productHandler();
        console.log('This is useEffect');
    }, []);
    const deleteProductById = async (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        
        if (!isConfirmed) {
            return; // If the user clicks "Cancel", stop the function
        }
    
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId));
                alert("Product Deleted Successfully");
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Failed to delete the product", error);
            alert("Failed to delete product");
        }
    };
    
    return (
        <div className="products-container"> {/* Added a container for styling */}
            {!products ? (
                <p>No products added</p>
            ) : (
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={()=>deleteProductById(item._id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;