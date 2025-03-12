import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './index.css';

function AddPage() {
    const navigate = useNavigate(); // Initialize navigate inside the component

    const handleNavigateToDelete = () => {
        navigate('/admin/delete-product');
    };
    const handleNavigateToAdd = () => {
      navigate('/admin/add-product');
  };


    return (
        <div className='add-product-container'>
          <h1 className='heading-el'>Admin Page</h1>
            <button className="Add-nav-button" onClick={handleNavigateToAdd}>
                Add Product
            </button>
          < br />
            <button className="delete-nav-button" onClick={handleNavigateToDelete}>
                Delete Product
            </button>
        </div>
    );
}

export default AddPage;