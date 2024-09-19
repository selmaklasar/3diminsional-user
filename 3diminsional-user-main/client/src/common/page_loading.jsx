import React from 'react';
import style from './loading.module.css';

const Page_Loading = () => {
  return (
    <div className={style.loadingcontainer}>
      <div className={style.loadingbox}>
        <div className={style.loadingspinner}></div>
        <p>Page Loading ...</p>
      </div>
    </div>
  );
};

export default Page_Loading;