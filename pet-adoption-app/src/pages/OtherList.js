import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


function OtherList() {
    const [others, setOthers] = useState([]);
    const ip = process.env.BACKEND_SERVER_IP;

    useEffect(() => {
        axios.get(`${ip}/others`).then(response => {
            setOthers(response.data.others);
            console.log(response.data);
        }).catch(error => console.error("Error fetching Others:", error));
    }, []);

    return (
        <div>
            <div className="mx-20 my-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                {others.map(pet => (
                    <div className="bg-yellow-100 p-8 rounded shadow text-black">
                        <h3 className="font-bold mb-4 text-center">{pet.name}</h3>
                        <h6 className="text-center">Breed: {pet.breed}</h6>
                        <h6 className="text-center">Age: {pet.age}</h6>
                        <Link to="adoptionForm" className="text-center">Adopt</Link>
                    </div>
                ))}
            </div>
        </div>       
    );
}


export default OtherList;

