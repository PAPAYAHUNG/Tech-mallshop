import React, { useEffect } from "react";
import * as Yup from "yup";
import { useRef } from "react";
import { useState } from "react";
import { commerce } from "../../../lib/commerce";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function AddressForm({ checkoutToken,handleNext }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const navigate = useNavigate()
  const refInput = useRef();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      city: "",
      zip: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(1, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      address: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      city: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      zip: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log({ values });
      handleNext({...values,shippingCountry,shippingSubdivision,shippingOption})
      // handleNext(values)
      resetForm();
    },
  });

  // console.log({ checkoutToken });
  //Fetching shipping countries
  const fetchShippingCountries = async (checkoutToken) => {
    try {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutToken
      );

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    } catch (err) {
      console.log({ err });
    }
  };

  //Fetching subdivision
  const fetchShippingSubDevisons = async (shippingCountry) => {
    try {
      const { subdivisions } =
        await commerce.services.localeListShippingSubdivisions(
          checkoutToken,
          shippingCountry
        );
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch shipping options
  const fetchShippingOptions = async (
    checkoutTokenID,
    shipping_option_id,
    country,
    region = null
  ) => {
    try {
      const resolve = await commerce.checkout.checkShippingOption(
        checkoutTokenID,
        { shipping_option_id, country, region }
      );
      // console.log({ resolve });
      setShippingOptions(resolve.shipping.available_options);
      setShippingOption(resolve.shipping.available_options[0]);
    } catch (error) {
      console.log({ error });
    }
  };
  //Turn object to array type
  const modifiedArrShippingCoutries = Object.entries(shippingCountries).map(
    ([item, meaning]) => {
      return { key: item, meaning: meaning };
    }
  );
  // console.log({ modifiedArrShippingCoutries });
  // console.log({ shippingCountries });
  // console.log({ shippingSubdivisions });
  // console.log({ shippingCountry });
  // console.log({ shippingSubdivision });

  const modifiedArrSubdivisions = Object.entries(shippingSubdivisions).map(
    ([item, meaning]) => {
      return { key: item, meaning: meaning };
    }
  );
  // console.log({ modifiedArrSubdivisions });

  useEffect(() => {
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchShippingSubDevisons(shippingCountry);
    }
  }, [shippingCountry, setShippingCountry]);
  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken?.id,
        checkoutToken?.shipping_methods[0].id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [shippingSubdivision]);

  // const [input, setInput] = useState({
  //   firstname: "",
  //   lastname: "",
  //   address: "",
  //   email: "",
  //   city: "",
  //   zip: "",
  // });
  // const refInput = useRef();

  // const handleChange = (e) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ input });
  //   setInput({
  //     firstname: "",
  //     lastname: "",
  //     address: "",
  //     email: "",
  //     city: "",
  //     zip: "",
  //   });
  //   refInput.current.focus();
  // };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-10 gap-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 text-center ">
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Fistname
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={refInput}
              type="text"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.firstname}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Last name
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.lastname}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Address
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.address}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Email
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.email}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              City
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.city}
              </span>
            ) : null}
          </div>
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Zip/ Postal code
            </label>{" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="zip"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <span className="text-red-500 text-sm font-medium">
                {formik.errors.zip}
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-3">
          <select
            value={shippingCountry}
            onChange={(e) => {
              setShippingCountry(e.target.value);
            }}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {modifiedArrShippingCoutries.map((item, index) => {
              return (
                <option key={index} value={item.key}>
                  {item.meaning}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-3">
          <select
            value={shippingSubdivision}
            onChange={(e) => {
              setShippingSubdivision(e.target.value);
            }}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {modifiedArrSubdivisions.map((item) => {
              return (
                <option value={item.key} key={item.key}>
                  {item.meaning}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-3">
          <select
            value={shippingOption}
            onChange={(e) => {
              setShippingOption(e.target.value);
            }}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {shippingOptions.map((item, index) => {
              return (
                <option
                  value={item.price.raw}
                  key={index}
                >{`${item.description} -${item.price.raw}`}</option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-between mt-5">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={()=>{ navigate('/')}}
          >
            Back to Cart
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
           
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddressForm;
