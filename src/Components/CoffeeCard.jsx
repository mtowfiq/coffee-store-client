import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, setCoffees, coffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete confirmed");
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
              const remainingCoffees = coffees.filter(cof => cof._id !== id)
              setCoffees(remainingCoffees)
            }
          });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure className="mr-4">
        <img src={photo} alt="Movie" />
      </figure>
      <div className="w-full flex justify-between items-center">
        <div className="space-y-4">
          <h2 className="card-title">Name: {name}</h2>
          <h2 className="card-title">Quantity: {quantity}</h2>
          <h2 className="card-title">Supplier: {supplier}</h2>
          <h2 className="card-title">Sweetness: {taste}</h2>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical lg:join-horizontal space-y-4">
            <button className="btn join-item">View</button>
            <Link to={`/updateCoffee/${_id}`}>
              <button className="btn join-item">Update</button>
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="btn join-item bg-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
