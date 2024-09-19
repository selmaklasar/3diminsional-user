import React, { useContext, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPart } from '../../redux/slice/model_parts';
import { Center } from '@react-three/drei';

const Skirt_part = () => {
  const partTypes = [
    { id: 1, part: 'top' },
    {id:2 ,part:'bottom'}

 
  ];

const dispatch=useDispatch()


const selectedPart=useSelector((state)=>state.modelparts.selectedPart) 
  const handlePartClick = (part) => {
    dispatch(setSelectedPart(part));
  };

  return (
    <div className="p-5 grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {partTypes.map((x) => (
        <button
          key={x.id}
          onClick={() => handlePartClick(x.part)}
          style={{ height: "70px", width: "100px",  display: "flex",
            justifyContent: "center",
       
            alignItems: "center",}}
          className={` className="flex justify-between items-center text-sm bg-neutral-600 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
                 ${
            selectedPart === x.part ? 'flex justify-between items-center text-sm bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link' : ''
          }`}
        >
          {x.part.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Skirt_part;
