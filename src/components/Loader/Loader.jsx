import React from "react";
import "./Loader.css";
import { TailSpin } from "react-loader-spinner";
const Loader = () => {
  return (
      <div className="loader">
        <TailSpin
        height="80"
        width="100"
        color="#E50914"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="loading"
        visible={true}
      />
      </div>
  );
};

export default Loader;
