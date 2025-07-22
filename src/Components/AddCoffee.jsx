import React from 'react';
import Swal from 'sweetalert2'

const AddCoffee = () => {

    const handleAddCoffee = (e) =>{
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const quantity = form.quantity.value
        const supplier = form.supplier.value
        const taste = form.taste.value
        const category = form.category.value
        const details = form.details.value
        // https://i.ibb.co/wZDLZxXS/1.png
        // https://i.ibb.co/JwjvLhv0/2.png
        // https://i.ibb.co/4ZNPhMXG/3.png
        // https://i.ibb.co/5hNSQpdV/4.png
        // https://i.ibb.co/pBPMCZXG/5.png
        // https://i.ibb.co/C5FFKZ5M/6.png
        const photo = form.photo.value

        const newCoffee = {
            name,
            quantity,
            supplier,
            taste,
            category,
            details,
            photo
        }
        console.log(newCoffee)

        // sending data to the server
        fetch("http://localhost:5000/coffee", {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: "Success",
                    text: "New coffee added",
                    icon: "success"
                });
                e.target.reset()
            }
        })
    }
    return (
        <div className='bg-[#F4F3F0] p-24'>
            <h2 className='text-3xl font-extrabold'>Add coffee</h2>
            <form onSubmit={handleAddCoffee}>
                {/* Name and Chef row */}
                <div className='md:flex mb-8 space-x-3'>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='name' type="text" placeholder='Coffee Name' className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Available Quantity</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='quantity' type="text" placeholder='Available Quantity' className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Supplier and Taste row */}
                <div className='md:flex mb-8 space-x-3'>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Supplier</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='supplier' type="text" placeholder='Supplier' className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Taste</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='taste' type="text" placeholder='Taste' className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Category and details row */}
                <div className='md:flex mb-8 space-x-3'>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Category</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='category' type="text" placeholder='Category' className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className='label'>
                            <span className="label-text">Details</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='details' type="text" placeholder='Details' className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* Photo row */}
                <div className='mb-8'>
                    <div className="form-control md:w-full">
                        <label className='label'>
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label htmlFor="" className="input-group">
                            <input name='photo' type="text" placeholder='Photo URL' className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add coffee" className='btn btn-block'/>
            </form>
        </div>
    );
};

export default AddCoffee;