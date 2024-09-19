import React, { useContext, useEffect, useState } from 'react';
import HomeScreen from './HomeScreen';
import BlackScreen from './PopScreen';


const Home = () => {



  const [count, setCount] = useState(null);

  const handleClick = (index) => {
    setCount(index);
  };

 


  return (
    <div>
      {count !== null ? (
        <BlackScreen onClick={handleClick} type={count} />
      ) : null}
      <HomeScreen onClick={handleClick} />
    </div>
  );
};

export default Home;
