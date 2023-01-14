import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Slider_data } from "./Slider_data";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";

export default function Slider() {
  const [current_index, set_current_index] = useState(0);
  const slider_ref = useRef<HTMLDivElement>();
  const [is_slider_ref_visible, set_is_slider_ref_visible] =
    useState<boolean>();

  let slide_interval: any;
  let picture_index: number;
  const nb_of_picture = Slider_data.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        set_is_slider_ref_visible(entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );
    observer.observe(slider_ref.current);

    slider_ref.current?.addEventListener("mouseenter", pause_slides);
    slider_ref.current?.addEventListener("mouseleave", play_slides);

    if (is_slider_ref_visible) {
      play_slides();
    }

    return () => {
      slider_ref.current?.removeEventListener("mouseenter", pause_slides);
      slider_ref.current?.removeEventListener("mouseleave", play_slides);
      pause_slides();
      is_slider_ref_visible;
      observer;
    };
  });

  const pause_slides = () => {
    clearInterval(slide_interval);
  };

  const play_slides = () => {
    slide_interval = setInterval(() => {
      next_picture();
    }, 3000);
  };

  const next_picture = () => {
    picture_index = (current_index + 1) % nb_of_picture;
    set_current_index(picture_index);

    //console.log("photo index clicked", current_index);
  };

  const prev_picture = () => {
    current_index === 0
      ? set_current_index(nb_of_picture - 1)
      : set_current_index(current_index - 1);

    console.log("client width off image with useRef");
  };

  return (
    <>
      <h1 id="gallery" className="text-2xl">
        Gallery
      </h1>
      <div className="mx-4 flex justify-center">
        <div
          ref={slider_ref}
          className="flex justify-center w-[400px] h-[200px] md:w-[800px] md:h-[400px] p-2 bg-yellow-300"
        >
          {Slider_data.map((photo, photo_index) => {
            return (
              <div
                key={photo_index}
                className={
                  current_index === photo_index
                    ? "opacity-[1] flex w-full ease-in duration-700 p-2"
                    : "opacity-0"
                }
              >
                {current_index === photo_index && (
                  <div className="relative flex flex-1 w-fit ease-in duration-1000">
                    <div className="absolute flex justify-between left-2 right-2 top-1/2 cursor-pointer select-none z-10">
                      <FaArrowAltCircleLeft
                        size={30}
                        className=" text-white/70"
                        onClick={prev_picture}
                      />
                      <FaArrowAltCircleRight
                        size={30}
                        className="text-white/70"
                        onClick={next_picture}
                      />
                    </div>
                    <Image
                      src={photo.photo}
                      fill
                      alt="slide photo"
                      priority
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-0 left-0">
                      <div className="flex flex-row justify-center items-center">
                        {Slider_data.map((slide, index) => {
                          return (
                            <div key={index} className="m-2 text-blue-300">
                              <BsCircleFill
                                size={10}
                                className={
                                  current_index === index
                                    ? "text-gray-300 scale-150 duration-1000"
                                    : "text-gray-600"
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
