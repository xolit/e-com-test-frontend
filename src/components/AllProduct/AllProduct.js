import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllProduct.css";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/products");
    result = await result.json();
    setProducts(result);
  };

  const DeleteProduct = async (id) => {
    let Delresult = await fetch(`http://localhost:8000/product/${id}`, {
      method: "Delete",
    });
    Delresult = await Delresult.json();
    console.log(Delresult);
    if (Delresult) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8000/search/${key}`);
      result = await result.json();
      
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  }

  return (
    <div className="product-container">
      <input type="text" className="searchProduct" placeholder="Search Product" onChange={searchHandle}/>
      {/* <h2>Our Products</h2> */}
      <table className="table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">S no.</th>
            <th className="table-head-data">Name</th>
            <th className="table-head-data">Price</th>
            <th className="table-head-data">Category</th>
            <th className="table-head-data">Company</th>
            <th className="table-head-data">Opreration</th>
          </tr>
        </thead>
        <tbody className="table-body">
          { products.length>0 ? products.map((item, index) => (
            <tr key={index}>
              <td className="table-body-data">{index + 1}</td>
              <td className="table-body-data">{item.name}</td>
              <td className="table-body-data">$ {item.price}</td>
              <td className="table-body-data">{item.category}</td>
              <td className="table-body-data">{item.company}</td>
              <td className="table-body-data">
                <button onClick={() => DeleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link>
              </td>
            </tr>
          )) : <h1>No Result Found</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default AllProduct;
