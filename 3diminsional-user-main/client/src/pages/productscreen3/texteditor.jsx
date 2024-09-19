import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import axiosInstance from '../../api/axios-instances';
import { addText } from '../../redux/slice/text_slice/text';
import { addText_back } from '../../redux/slice/text_slice/back_text';

function TextEditor() {
  const [showInput, setShowInput] = useState(false);
  const [selectedFont, setSelectedFont] = useState('playwrite');
  const [selectedColor, setSelectedColor] = useState('black');
  const [textInput, setTextInput] = useState('');
  const dispatch = useDispatch();
  const selectedpart = useSelector((state) => state.modelparts.selectedPart);
  const toggleInput = () => {
    setShowInput(prev => !prev);
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFontChange = (selectedOption) => {
    setSelectedFont(selectedOption.value);
  };

  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption.value);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await axiosInstance.get(`/font?name=${selectedFont}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const fontvalue = response.data.data[0].fontUrl;
      if( selectedpart === "front"){
      dispatch(addText({ text: textInput, font: fontvalue, color: selectedColor, x: 0, y: 1, size: 0.03, radius: 0.01, letterSpace: 0.01 }));
      }
      else if( selectedpart === "back"){
        dispatch(addText_back({ text: textInput, font: fontvalue, color: selectedColor, x: 0, y: 1, size: 0.03, radius: 0.01, letterSpace: 0.01 }));
        }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fontOptions = [
    { value: 'playwrite', label: 'Playwrite Cuba' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'Fascinate_inline', label: 'Fascinate Inline' },
  ];

  const colorOptions = [
    { value: 'black', label: 'Black' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
  ];

  return (
    <div style={{ position: 'absolute', top: "50px",right:"670px"}}>
      <button
        className="bg-neutral-500 text-zinc-200 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
        onClick={toggleInput}
        style={{ width: "80px", height: "50px" }}
      >
        <span className="previous">TEXT</span>
      </button>

      {showInput && (
        <div style={{ marginTop: "20px" ,left:"0px", position: 'absolute',display: "flex", gap: "10px",  alignItems: "center",width:"1000px"}}>
          <input
            type="text"
            placeholder="Enter text"
            onChange={handleTextChange}
            style={{
              height: "30px",
              width: "150px",
              border: "2px solid black",
              borderRadius: "5px",
              padding: "5px",
              fontFamily: selectedFont,
              color: selectedColor
            }}
          />

          <div style={{ }}>
            <Select
              options={fontOptions}
              value={fontOptions.find(option => option.value === selectedFont)}
              onChange={handleFontChange}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  position: 'absolute',
                  width: '250px',
                  zIndex: 100
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: '100px'
                })
              }}
            />
          </div>

          <div>
            <Select
              options={colorOptions}
              value={colorOptions.find(option => option.value === selectedColor)}
              onChange={handleColorChange}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  position: 'absolute',
                  width: '150px',
                  zIndex: 100
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: '80px'
                })
              }}
            />
          </div>

          <button
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
            style={{ padding: "10px", cursor: "pointer" }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default TextEditor;
