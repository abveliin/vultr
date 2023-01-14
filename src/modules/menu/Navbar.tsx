import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import logo from "../../../public/pictures/logo.jpeg";

import Navbar_elts from "./Navbar_elts";
import Mobile_nav_toggle from "./Mobile_nav_toggle";
import Mobile_menu from "./Mobile_menu";

const Navbar = () => {
  const [nav_bg_color, set_nav_bg_color] = useState("transparent");
  const [nav_text_color, set_nav_text_color] = useState("white");

  const [nav_state, set_nav_state] = useState(false);

  const navbar_elts: object = {
    home: "/",
    gallery: "/#gallery",
    work: "/portfolio",
    contact: "/contact",
    parallax: "/parallax",
  };

  useEffect(() => {
    const change_nav_color_fn = () => {
      if (window.scrollY >= 10) {
        set_nav_bg_color("#ffffff");
        set_nav_text_color("#000000");
        console.log("scroll y");
      } else {
        set_nav_bg_color("transparent");
        set_nav_text_color("white");
        console.log("scrollY is less than 90px");
      }
    };
    window.addEventListener("scroll", change_nav_color_fn);
  }, []);

  return (
    <nav
      style={{ backgroundColor: `${nav_bg_color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300 border-b-black border-b-2"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center py-2 text-white">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            priority
            className="w-auto h-auto aspect-auto object-cover"
          />
        </Link>

        <Navbar_elts
          nav_text_color={nav_text_color}
          items={navbar_elts}
          class_name="hidden sm:flex -mx-4"
        />

        <Mobile_nav_toggle
          nav_text_color={nav_text_color}
          set_nav_state={set_nav_state}
          nav_state={nav_state}
        />
        <Mobile_menu navbar_elts={navbar_elts} nav_state={nav_state} />
      </div>
    </nav>
  );
};

export default Navbar;
