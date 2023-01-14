import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function Instagram({ ig_feed }: any) {
  const images = ig_feed.data;

  const slider_ref = useRef<HTMLDivElement>();
  const slide_ref = useRef<HTMLDivElement>();
  const video_ref = useRef<HTMLDivElement>();

  let [slider, set_slider] = useState<HTMLDivElement>();
  const [slide, set_slide] = useState<HTMLDivElement>();
  const [video_h, set_video_h] = useState();

  const [media_width, set_media_width] = useState();
  const [media_height, set_media_height] = useState();

  useEffect(() => {
    set_slider(slider_ref.current);
    set_slide(slide_ref.current);
    set_media_height(video_ref.current?.clientWidth);

    return () => {
      slider_ref.current;
      slider_ref.current;
    };
  }, []);

  //console.log(images);
  const slide_width: number = slide?.clientWidth;
  const slider_width: number = slider?.clientWidth;
  const slide_scroll = slider_width / slide_width;

  const scroll = slide_scroll * slide_width - 300;
  const scroll_left = () => {
    slider.scrollLeft = slider.scrollLeft - scroll;
  };

  const scroll_right = () => {
    slider.scrollLeft = slider.scrollLeft + scroll;
  };

  return (
    <div>
      <h1 className="text-2xl">Follow us on IG</h1>

      <div className="flex items-center">
        <FaChevronLeft
          onClick={scroll_left}
          size={30}
          className="text-red-500 z-10"
        />

        <div
          ref={slider_ref}
          className="flex items-start whitespace-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide scroll-smooth mb-8 bg-slate-600"
        >
          {images &&
            images.map((image: any) => (
              <div ref={slide_ref} id={image.id} key={image.id} data-slide>
                {image.media_type === "IMAGE" ? (
                  <Link
                    href={image.permalink}
                    className="flex justify-center items-center h-[150px] w-max  cursor-pointer hover:scale-105 ease-in-out duration-300"
                  >
                    <Image
                      src={image.media_url}
                      alt=""
                      width={150}
                      height={150}
                      priority
                      className="h-full w-full inline-block p-2 object-cover object-center"
                    />
                  </Link>
                ) : (
                  <Link
                    href={image.permalink}
                    className="flex justify-center items-center h-[150px] min-w-[150px] w-[220px] px-2 cursor-pointer hover:scale-105 ease-in-out duration-300 "
                  >
                    <video loop>
                      <source
                        ref={video_ref}
                        src={image.media_url}
                        // height="300px"
                        // width="300px"
                        className="bg-red-200 p-4"
                      />
                    </video>
                  </Link>
                )}
              </div>
            ))}
        </div>

        <FaChevronRight
          onClick={scroll_right}
          size={30}
          className="text-red-500 z-10"
        />
      </div>
    </div>
  );
}
