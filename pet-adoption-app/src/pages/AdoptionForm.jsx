import React, { useRef } from "react";
import axios from "axios";
import Input from "../components/Input";

function AdoptionForm() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const ownedPetRef = useRef();
    const messageRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newFormData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            ownedPet: ownedPetRef.current.value,
            message: messageRef.current.value                 
        }
        
        console.log('Form data submitted:', newFormData);
        try {
            const request = await axios.post("http://44.204.241.99:80/adoption", newFormData);
            console.log(request.data);
            alert("Confirmation Email Sent!");
        }
        catch(error) {
            alert("Error sending application");
            console.error("Error sending appication: ", error.response);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12">
            <div className="mx-auto w-full">
                <h1 className="text-center text-2xl font-bold text-gray-900 leading-9">Adoption Form</h1>
                <p className="mt-5 text-center text-2xl">Please fill out the following adoption form to adopt this cutie!</p>
            </div>
            <div className="mt-10 mx-auto w-full max-w-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between gap-3">
                        <Input type="text" label="First Name" inputRef={firstNameRef} />
                        <Input type="text" label="Last Name" inputRef={lastNameRef} />
                    </div>
                    <Input type="email" label="Email" inputRef={emailRef} />
                    <Input type="checkbox" label="Are you having any pets?" inputRef={ownedPetRef} />
                    <Input type="textarea" label="Please share why you want to adopt this pet" inputRef={messageRef} />

                    <button className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AdoptionForm;