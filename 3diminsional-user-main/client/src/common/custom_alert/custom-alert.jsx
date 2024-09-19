import React from 'react';
import style from './custom-alert.module.css'; 

const CustomAlert = ({ message, type }) => {
  return (
    <div className={`${style.customalert} ${style[type]}`}>
      {message}
    </div>
  );
};

export default CustomAlert;
