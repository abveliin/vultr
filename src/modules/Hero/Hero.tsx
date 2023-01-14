import React from "react";

interface I_hero {
  heading: string;
  message: string;
}
const Hero = ({ heading, message }: I_hero) => {
  const styles = `bg-blue-500 flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img`;
  return (
    <div className={styles}>
      {/* Overlay */}
      <div className="inset-0 bg-black/70 z-[2]" />
      <div className="p-5 z-[2]">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <button className="px-8 py-2 border">Book</button>
      </div>
    </div>
  );
};

export default Hero;
