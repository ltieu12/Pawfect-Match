import React, { useState } from "react";
import axios from "axios";

function AdoptionForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        ownedPet: false,
        message:''
    });
    const ip = process.env.BACKEND_SERVER_IP;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        try {
            const request = await axios.post(`${ip}/adoption`, formData);
            console.log(request.data);
        }
        catch(error) {
            alert("Error sending application");
            console.log("Error sending appication: ", error);
        }
        
    };

    return (
        <div className="flex flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto w-full">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Adoption Form</h1>
                <p className="mt-5 text-center text-2xl leading-6 tracking-tight">Please fill out the following adoption form to adopt this cutie!</p>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full max-w-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <label className="block font-medium leading-6">
                                First Name:
                                <input className="pl-3 block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block font-medium leading-6">
                                Last Name:
                                <input className="pl-3 block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium leading-6">
                            Email:
                            <input className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label className="flex block font-medium leading-6 items-center">
                            Are you having any pets?:
                            <input className="ml-5 w-5 h-5 rounded focus:ring-primary shadow-sm ring-1 ring-inset"
                                type="checkbox"
                                name="ownedPet"
                                value={formData.ownedPet}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block font-medium leading-6">
                            Please share why you want to adopt this pet:
                            <textarea className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AdoptionForm;