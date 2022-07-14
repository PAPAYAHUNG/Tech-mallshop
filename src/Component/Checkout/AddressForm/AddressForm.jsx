import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { commerce } from "../../../lib/commerce";

function AddressForm({checkoutToken}) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountrie, setShippingCountrie] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutToken) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(checkoutToken);
        setShippingCountries(countries)
      
    } catch (err) {
        console.log({err});
    }
  };

  console.log({shippingCountries})

  useEffect(()=>{
    fetchShippingCountries()
  },[])


  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    city: "",
    zip: "",
  });
  const refInput = useRef();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ input });
    setInput({
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      city: "",
      zip: "",
    });
    refInput.current.focus();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 text-center p-10 gap-4">
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Fistname
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={refInput}
            type="text"
            name="firstname"
            value={input.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Last name
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Address
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            City
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="city"
            value={input.city}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Zip/ Postal code
          </label>{" "}
          <br />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="zip"
            value={input.zip}
            onChange={handleChange}
          />
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
