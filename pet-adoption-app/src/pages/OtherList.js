import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function OtherList() {
    const [others, setOthers] = useState([]);
    const navigate = useNavigate();

    const navigateToForm = () => {
        navigate('/adoptionForm');
    };

    useEffect(() => {
        axios.get("http://localhost:8080/others").then(response => {
            setOthers(response.data.others);
            console.log(response.data);
        }).catch(error => console.error("Error fetching Others:", error.response));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {others.map(pet => (
                    <div className="bg-green-200 p-8 rounded shadow text-black">
                        <h1 className="font-bold mb-4 text-center text-2xl">{pet.name}</h1>
                        <div className="flex justify-center my-4">
                            <img src={pet.imageSource} alt="Other pet photos" className="w-auto h-48 object-cover rounded mb-2" />
                        </div>
                        <h6 className="text-center text-lg"><strong>Breed</strong>: {pet.breed}</h6>
                        <h6 className="text-center text-lg"><strong>Age</strong>: {pet.age}</h6>
                        <div className="flex justify-center mt-4">
                            <button onClick={navigateToForm} className="text-center text-lg text-white font-semibold rounded shadow bg-gray-800 hover:bg-gray-900 px-3 py-1">Adopt</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>       
    );
}


export default OtherList;

