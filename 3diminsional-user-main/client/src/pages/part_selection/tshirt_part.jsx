import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPart } from '../../redux/slice/model_parts';

const TshirtPart = () => {
  const partTypes = [
    { id: 1, part: 'front' },
    { id: 2, part: 'back' },
    { id: 3, part: 'right' },
    { id: 4, part: 'left' },
  ];

  const dispatch = useDispatch();
  const selectedPart = useSelector((state) => state.modelparts.selectedPart);

  const handlePartClick = (part) => {
    dispatch(setSelectedPart(part));
  };

  return (
    <div className="p-5 grid gap-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-6" >
      {partTypes.map((x) => (
        <button
          key={x.id}
          onClick={() => handlePartClick(x.part)}
          style={{ width: "80px" }}
          className={`bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link${
            selectedPart === x.part ? 'bg-neutral-700' : ''
          }`}
        >
          {x.part.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TshirtPart;
