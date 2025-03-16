import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CatList() {
    const [cats, setCats] = useState([]);
    const navigate = useNavigate();

    const navigateToForm = () => {
        navigate('/adoptionForm');
    };

    useEffect(() => {
        axios.get("http://44.204.241.99:80/cats")
        .then(response => {
            setCats(response.data.cats);
            console.log(response.data);
        })
        .catch(error => console.error("Error fetching Cats:", error.response));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {cats.map(cat => (
                    <div className="bg-blue-100 p-8 rounded shadow text-black">
                        <h1 className="font-bold mb-4 text-center text-2xl">{cat.name}</h1>
                        <div className="flex justify-center my-4">
                            <img src={cat.imageSource} alt="Cat photos" className="w-auto h-48 object-cover rounded mb-2" />
                        </div>
                        <h6 className="text-center"><strong>Breed</strong>: {cat.breed}</h6>
                        <h6 className="text-center"><strong>Age</strong>: {cat.age}</h6>
                        <div className="flex justify-center mt-4">
                            <button onClick={navigateToForm} className="text-center text-lg text-white font-semibold rounded shadow bg-gray-800 hover:bg-gray-900 px-3 py-1">Adopt</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>       
    );
}

export default CatList;

