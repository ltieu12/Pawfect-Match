import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


function CatList() {
    const [cats, setCats] = useState([]);
    const ip = process.env.BACKEND_SERVER_IP;

    useEffect(() => {
        axios.get(`${ip}/cats`).then(response => {
            setCats(response.data.cats);
        }).catch(error => console.error("Error fetching Cats:", error));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {cats.map(cat => (
                    <div className="bg-yellow-100 p-8 rounded shadow text-black">
                        <h3 className="font-bold mb-4 text-center">{cat.name}</h3>
                        <h6 className="text-center">Breed: {cat.breed}</h6>
                        <h6 className="text-center">Age: {cat.age}</h6>
                        <Link to="adoptionForm">Adopt</Link>
                    </div>
                ))}
            </div>
        </div>       
    );
}

export default CatList;

