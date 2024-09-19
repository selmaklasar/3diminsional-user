import React, { useState, useEffect, Suspense } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Crop_top from "../models/crop_top";
import Jump_suit from "../models/jump_suit";
import Skirt from "../models/skirt";
import Wclth from "../models/wclth";
import Basic_shirt from "../models/basic_shirt";
import Joyride from 'react-joyride';
import CropTopPart from "../part_selection/crop_top_parts";
import Jump_suit_Part from "../part_selection/jump_suit_part";
import Skirt_part from "../part_selection/skirt_parts";
import Wclth_Part from "../part_selection/wclth_part";
import Basic_shirt_part from "../part_selection/basic_shirt_parts";
import TshirtPart from "../part_selection/tshirt_part";
import Navbar from '../../common/NavBar';
import Loading from "../../common/loading";
import ErrorMessage from "../../common/error";
import { setSelectedimage } from "../../redux/slice/model_parts";
import New_tshirt from "../models/tshirt_3d_modal/new_tshirt";
import axios from 'axios'
import Cookies from 'js-cookie';
import Tshirt_3d_model_modal from "../TSHIRT_PAGE/tshirt_modal";
import Decal_upload from "./upload";
import CustomAlert from "../../common/custom_alert/custom-alert";
import TextEditor from "./texteditor";
import ClearButton from "./clearbutton";
const materialType = [
  { id: 1, material: "cotton" },
  { id: 2, material: "polyster" },
  { id: 3, material: "Denim" },
  { id: 4, material: "corduroy" },
  { id: 5, material: "knitted fabric" },
  { id: 6, material: "lycra" },
  { id: 7, material: "hacob" },
  { id: 8, material: "linen" },
  { id: 9, material: "velvet" },
  { id: 10, material: "rayon" },
  { id: 11, material: "georgette" },
  { id: 12, material: "crepe" },
  { id: 13, material: "hacoba" },
  { id: 14, material: "spandes" },
  { id: 15, material: "satin" },
];

const buttonType = [
  { id: 1, color: "bg-white" },
  { id: 2, color: "bg-black" },
  { id: 3, color: "bg-red-700" },
  { id: 4, color: "bg-orange-600" },
  { id: 5, color: "bg-amber-400" },
  { id: 6, color: "bg-yellow-900" },
  { id: 7, color: "bg-lime-500" },
  { id: 8, color: "bg-green-800" },
  { id: 9, color: "bg-teal-300" },
  { id: 10, color: "bg-cyan-500" },
  { id: 11, color: "bg-sky-400" },
  { id: 12, color: "bg-rose-600" },
];


export default function ProductScreen() {
  const total_indside = 0
  const dispatch = useDispatch()
  const routeModelSelected = useSelector((state) => state.model.routeModelSelected);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showButtonTypes, setShowButtonTypes] = useState(false);
  const [material, setMaterial] = useState("none");
  const [button, setButton] = useState("bg-black");
  const [color, setColor] = useState("bg-white");
  const [currentImages, setCurrentImages] = useState([]);
  const [price, setPrice] = useState([])
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [runTour, setRunTour] = useState(true);
  const[show,Setshow]=useState(false)
  const[hide,setHide]=useState(false)
  const [selectedMaterials, setSelectedMaterials] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const selectedpart = useSelector((state) => state.modelparts.selectedPart)


  const steps = [
    {
      target: '.material', 
      content: 'This is it show material',
    },
    {
    target: '.previous',
      content: 'This is it go  back',
    },
  
   
  ];


  const loading = useSelector((state) => state.loadingError.isloading);
  const error1=useSelector((state) => state.loadingError.iserror);
  console.log("eror1",error1)

  async function fetchMaterialImages(material) {
    try {
      const token = Cookies.get("accessToken");
      const response = await axios.get(`http://localhost:3001/api/fabrics/allFabricByType?type=${material}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("respoisne", response)
      const data = response.data.data;
      const price = data.map(price => price.pricePerMeter);
      const colors = data.map(color => color.color);
      const uniqueColors = Array.from(new Set(colors));
     
      return { uniqueColors, price };
    } catch (error) {
      setError(`Out of Stock ${material}`);
      console.log(error)
      return { colors: [], price: [] };
    }
  }


  function handleButtonType() {
    setShowButtonTypes(!showButtonTypes);
    if (showMaterials) {
      setShowMaterials(false);
    }
  }

  function handleMaterials() {
    setShowMaterials(!showMaterials);
    if (showButtonTypes) {
      setShowButtonTypes(false);
    }
  }

  async function handleMaterialClick(material) {
    setMaterial(material);
    setColor("bg-white");
    console.log("material clicked")
    const { colors = [], price = [] } = await fetchMaterialImages(material);
    console.log("material clicked after",colors,price)
    setPrice(price);
    setCurrentImages(colors);
  }



  function handleImageSelected(image, index) {
    dispatch(setSelectedimage(image));

    setSelectedMaterials((prevSelectedMaterials) => {
      const updatedMaterials = { ...prevSelectedMaterials };
      const materialPrice = price[index];

      const currentMaterial = updatedMaterials[selectedpart];
      const previousPrice = currentMaterial ? currentMaterial.price : 0;

      setTotalPrice((prevTotal) => {

        let newTotal;
        if (!currentMaterial) {

          newTotal = prevTotal + materialPrice;
        } else if (currentMaterial.Url !== image) {

          newTotal = prevTotal - previousPrice + materialPrice;
        } else {

          newTotal = prevTotal;
        }

        console.log("Previous total:", prevTotal);
        console.log("Material price:", materialPrice);
        console.log("New total:", newTotal);

        return newTotal;
      });

      // Update the selected materials state
      updatedMaterials[selectedpart] = {
        Url: image,
        price: materialPrice,
      };

      return updatedMaterials;
    });
  }






  const selectedImage = useSelector((state) => state.modelparts.selectedimage)
  return (
    <>
      <Navbar
        style={{

          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      />

<Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={(data) => {
          if (data.status === 'finished') setRunTour(false);
        }}
      />


<Tshirt_3d_model_modal show={show} onHide={() => Setshow(false)} />

      <div className="w-full flex flex-col gap-5 justify-center items-center mt-10 px-2 py-10 md:p-10">
        <div
          className="py-5 px-10 md:p-5 rounded-lg"
          style={{
            width: "1480px",
            height: "400px",
     
            position: "fixed", // Change this to fixed
            top: "85px",   // Adjust as needed
            // Center the element horizontally
            backgroundColor: "#2B4136",
            zIndex: 1000,
          }}
        >
          {loading && <Loading />}

          {error1.state &&(

<CustomAlert  message={error1.message}type={"error"}  />)
}

          {routeModelSelected === "crop_top" && (
            <Suspense fallback={<Loading />}>
              <Crop_top url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/model.gltf" />
            </Suspense>
          )}
          {routeModelSelected === "jump_suit" && (
            <Suspense fallback={<Loading />}>
              <Jump_suit url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/updated_jumpsuit.gltf" />
            </Suspense>
          )}
          {routeModelSelected === "skirt" && (
            <Suspense fallback={<Loading />}>
              <Skirt url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/1723244474614-skirt.gltf" />
            </Suspense>
          )}
          {routeModelSelected === "wclth" && (
            <Suspense fallback={<Loading />}>
              <Wclth url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/wclth.gltf" />
            </Suspense>
          )}
          {routeModelSelected === "basic_shirt" && (
            <Suspense fallback={<Loading />}>
              <Basic_shirt url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/basic_shirt.gltf" />
            </Suspense>
          )}
          {routeModelSelected === "tshirt" && (
            <Suspense fallback={<Loading />}>
              <New_tshirt url="https://3dimensionaldilu.s3.ap-south-1.amazonaws.com/compressed.gltf" />
            </Suspense>
          )}
        </div>

        <div
          className="bg-zinc-800 w-full py-5 p-2 md:p-5 "
          style={{
            position: "relative",
            top: "380px",
            height: "260px",
            overflow: "auto",
            backgroundColor: "white"
          }}
        >
          <div
            className="flex flex-col md:flex-row gap-5 justify-between md:items-center"
            style={{
              position: "relative",
              bottom: "50px",


            }}
          >
            <div className="flex gap-3 md:ms-5 relative">
              <button
                onClick={handleMaterials}
                className="flex justify-between items-center text-sm bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
              >
                <span className="material">MATERIALS</span>
                <span className="md:text-xl">
                  {showMaterials ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </span>
              </button>
              <div className="flex gap-3 me-5">
             
                <button className="bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link">
                <Decal_upload/>
                </button>
              {/* 
                <button className="bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
                onClick={()=>{Setshow(true)}}
                >
                  UPLOAD
                </button>
               */}
            
                              

             

              </div>
              {showMaterials && (
                <div
                  className="absolute left-0 w-full bg-zinc-700 p-3 mt-1 rounded-md shadow-lg"
                  style={{ top: "100%", width: "1480px", left: "-30px" }}
                >
                  <div className="grid grid-cols-8 gap 3">
                    {materialType.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleMaterialClick(m.material)}
                        className={`flex justify-between items-center text-sm bg-neutral-500 text-zinc-200 p-3 rounded-md 
                        border-2 border-neutral-700 
                        hover:border-neutral-400 hover:shadow-md hover:bg-neutral-600 
                        transition-colors duration-200 ease-in-out 
                        ${material === m.material
                            ? "bg-neutral-400 border-neutral-400"
                            : "border-neutral-300"
                          }`}

                      >
                        {m.material.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  {currentImages.length > 0 ? (
                    <div className="flex justify-center gap-10 mt-5">
                      {currentImages.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            onClick={() => handleImageSelected(color, index)}
                            style={{ backgroundColor: color }}
                            className={`w-20 h-20 cursor-pointer rounded-md border-2 hover:border-blue-500 ${selectedImage === color
                                ? "border-blue-500"
                                : "border-transparent"
                              }`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : 
                  <ErrorMessage/>
                  }
                </div>
              )}
            </div>
       
              <TextEditor/>
            
<ClearButton/>
            <div className="flex flex-wrap gap-3 justify-center"

              style={{ position: "relative", left: "140px", }}
            >
              {routeModelSelected === "crop_top" && <CropTopPart />}
              {routeModelSelected === "jump_suit" && <Jump_suit_Part />}
              {routeModelSelected === "skirt" && <Skirt_part />}
              {routeModelSelected === "wclth" && <Wclth_Part />}
              {routeModelSelected === "basic_shirt" && <Basic_shirt_part />}
              {routeModelSelected === "tshirt" && <TshirtPart />}
            </div>

            <div className="flex gap-3 relative">
             

              {showButtonTypes && (
                <div
                  className="absolute left-0 w-full bg-zinc-700 p-3 mt-1 rounded-md shadow-lg"
                  style={{ top: "100%" }}
                >
                  <div className="flex flex-wrap gap-3 justify-center">
                    {buttonType.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setButton(b.color)}
                        className={`w-8 h-8 rounded-full ${b.color}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>


          </div>

        </div>
      </div>

    </>
  );
}
