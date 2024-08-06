import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateProduct.css";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);
  
  const getProductDetails = async() => {
    let result = await fetch(`http://localhost:8000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const handleUpdateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    navigate('/');
  }

  return (
    <div className="main">
      <h2>Update Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        className="input-style"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && <span className="invalid-inp">Enter Valid Name</span>}

      <input
        type="number"
        placeholder="Product Price"
        className="input-style"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && <span className="invalid-inp">Enter Valid Price</span>}

      <input
        type="text"
        placeholder="Product Category"
        className="input-style"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && <span className="invalid-inp">Enter Valid Category</span>}

      <input
        type="text"
        placeholder="Product Company"
        className="input-style"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && <span className="invalid-inp">Enter Valid Company</span>}

      <button type="submit" className="Btn" onClick={handleUpdateProduct}>
      </button>
    </div>
  );
};

export default UpdateProduct;
