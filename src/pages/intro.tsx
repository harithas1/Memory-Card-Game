import Green from "../assets/Green.mp4";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();

  // after 17 seconds it should to level1
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("");
    }, 17000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={Green} type="video/mp4" />
        </video>
      </div>
      <Outlet />
    </>
  );
}
