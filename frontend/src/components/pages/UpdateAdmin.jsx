import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { updateUsersThunk } from "../redux/admin.slice";

const UpdateAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = useSelector((state) => state.admin.users);

  //   console.log(result);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [file, setFile] = useState(""); // File should be null initially
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");

  async function handleForm(e) {
    e.preventDefault();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(email|googlemail|gmail|yahoo|yahoomail)\.com$/;
    const mobileRegex = /^\d{10}$/;

    // Check if all fields are filled
    if (
      fname &&
      lname &&
      email &&
      mobile &&
      address &&
      city &&
      zip &&
      file &&
      dob &&
      password &&
      cpass
    ) {
      if (emailRegex.test(email)) {
        if (mobileRegex.test(mobile)) {
          if (password !== cpass) {
            toast.error("Passwords do not match");
            // alert("Passwords do not match");
          } else {
            const formData = new FormData();
            formData.append("fname", fname);
            formData.append("lname", lname);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("zipcode", zip);
            formData.append("dob", dob);
            formData.append("password", password);
            formData.append("file", file);
            // const data={fname,lname,email,mobile,address,city,zip,file,dob,password}
            try {
              await dispatch(updateUsersThunk({ id, formData })).unwrap();
              navigate("/admin");
            } catch (error) {
              console.log(error);
            }

            // alert("Form submitted successfully");
          }
        } else {
          toast.error("enter 10 digit only");

          // alert("enter 10 digit only ");
        }
      } else {
        toast.error("Invalid email format");

        // alert("Invalid email format");
      }

      // alert("Form submitted successfully");

      console.log(
        fname,
        lname,
        email,
        mobile,
        address,
        city,
        zip,
        file.name, // Ensuring file is properly handled
        dob,
        password,
        cpass
      );
    } else {
      toast.error("Please fill all the fields");
      // alert("Please fill all the fields");
    }
  }

  useEffect(() => {
    if (result && result.length > 0) {
      const data = result.find((res) => res._id === id);
      console.log(data);
      setFname(data.fname);
      setLname(data.lname);
      setEmail(data.email);
      setMobile(data.mobile);
      setAddress(data.address);
      setCity(data.city);
      setZip(data.zipPostalCode);
      setDob(data.dob);
      setFile(data.file);
    }
  }, [result]);

  return (
    <>
      <Navbar />
      <br />
      <br /> <br />
      <section className="p-6  dark:text-gray-900 bg-black text-white ">
        <h1 className="md:text-5xl text-white capitalize text-center pb-8 underline shadow-md shadow-white">
          Update Admin
        </h1>
        <form
          onSubmit={handleForm}
          noValidate=""
          action=""
          method=""
          encType="multipart/form-data"
          className="container flex flex-col mx-auto space-y-12 shadow-md shadow-white"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
            <div className="space-y-4 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Amet, dolor earum pariatur fugit, dolore eaque
                veritatis inventore sint sapiente nobis maxime vitae, nisi
                mollitia voluptatibus labore tempora aperiam! Quia, nam.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">First name</label>
                <input
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                  name="fname"
                  type="text"
                  placeholder="First name"
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Last name</label>
                <input
                  onChange={(e) => setLname(e.target.value)}
                  name="lname"
                  value={lname}
                  type="text"
                  placeholder="Last name"
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3 ">
                <label className="text-sm">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Mobile</label>
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  type="number"
                  placeholder="Mobile"
                  value={mobile}
                  className="w-full  text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full">
                <label className="text-sm">Address</label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  value={address}
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">City</label>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  value={city}
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">State / Province</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <label className="text-sm">ZIP / Postal</label>
                <input
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  value={zip}
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm capitalize font-bold">
                  upload profile
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  placeholder="no choosen file"
                  accept=".jpeg, .jpg, .png"
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 border border-red-600"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm capitalize font-bold">DOB</label>
                <input
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  placeholder=""
                  value={dob}
                  className="w-full bg-slate-300  rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-900 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm capitalize font-bold">
                  Enter Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm capitalize font-bold">
                  Enter Confirm Password
                </label>
                <input
                  onChange={(e) => setCpass(e.target.value)}
                  type="password"
                  placeholder=""
                  className="w-full text-black rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              <div className="col-span-6">
                <Link to="/login" className=" capitalize">
                  do you have an account?{" "}
                  <span className="link">login now</span>
                </Link>
              </div>
              <div className="col-span-full sm:col-span-6 ">
                <button className="btn btn-info w-full md:text-xl capitalize tracking-widest font-serif">
                  Update
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
};

export default UpdateAdmin;
