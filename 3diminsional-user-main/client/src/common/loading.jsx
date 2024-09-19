import React from 'react';
import style from './loading.module.css';

const Loading = () => {
  return (
    <div className={style.loadingcontainer}>
      <div className={style.loadingbox}>
        <div className={style.loadingspinner}></div>
        <p>Loading Model ...</p>
      </div>
    </div>
  );
};

export default Loading;