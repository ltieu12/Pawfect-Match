import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function DogList() {
    const [dogs, setDogs] = useState([]);
    const navigate = useNavigate();

    const navigateToForm = () => {
        navigate('/adoptionForm');
    };

    useEffect(() => {
        axios.get("http://localhost:8080/dogs").then(response => {
            setDogs(response.data.dogs);
            console.log(response.data);
        }).catch(error => console.error("Error fetching Dogs:", error.response));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {dogs.map(dog => (
                    <div className="bg-yellow-100 p-8 rounded shadow text-black">
                        <h1 className="font-bold mb-4 text-center text-2xl">{dog.name}</h1>
                        <div className="flex justify-center my-4">
                            <img src={dog.imageSource} alt="Dog photos" className="w-auto h-48 object-cover rounded mb-2" />
                        </div>
                        <h6 className="text-center"><strong>Breed</strong>: {dog.breed}</h6>
                        <h6 className="text-center"><strong>Age</strong>: {dog.age}</h6>
                        <div className="flex justify-center mt-4">
                            <button onClick={navigateToForm} className="text-center text-lg text-white font-semibold rounded shadow bg-gray-800 hover:bg-gray-900 px-3 py-1">Adopt</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>       
    );
}

export default DogList;

