import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    let result = await fetch("http://localhost:8000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      const error = await result.json();
      console.error("Error:", error);
      return;
    }

    const data = await result.json();
    console.log(data);
    navigate('/');
  };

  return (
    <div className="main">
      <h2>Add Product</h2>

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
      {error && !price && (
        <span className="invalid-inp">Enter Valid Price</span>
      )}

      <input
        type="text"
        placeholder="Product Category"
        className="input-style"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="invalid-inp">Enter Valid Category</span>
      )}

      <input
        type="text"
        placeholder="Product Company"
        className="input-style"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && (
        <span className="invalid-inp">Enter Valid Company</span>
      )}

      <button type="submit" className="Btn" onClick={addProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
