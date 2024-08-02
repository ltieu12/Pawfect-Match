import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


function DogList() {
    const [dogs, setDogs] = useState([]);
    const ip = process.env.BACKEND_SERVER_IP;

    useEffect(() => {
        axios.get(`${ip}/dogs`).then(response => {
            setDogs(response.data.dogs);
            console.log(response.data);
        }).catch(error => console.error("Error fetching Dogs:", error));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {dogs.map(dog => (
                    <div className="bg-yellow-100 p-8 rounded shadow text-black">
                        <h3 className="font-bold mb-4 text-center">{dog.name}</h3>
                        <h6 className="text-center">Breed: {dog.breed}</h6>
                        <h6 className="text-center">Age: {dog.age}</h6>
                        <Link to="adoptionForm">Adopt</Link>
                    </div>
                ))}
            </div>
        </div>       
    );
}

export default DogList;

