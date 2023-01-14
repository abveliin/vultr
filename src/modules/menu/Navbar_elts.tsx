import React from "react";
import Link from "next/link";

const Navbar_elts = ({ nav_text_color, items, class_name }) => {
  const base_style = "p-4 hover:text-gray-500 focus:outline-none";
  //const styles = `${base_style} ${items_style}`
  return (
    <ul style={{ color: `${nav_text_color}` }} className={class_name}>
      {Object.entries(items).map((elt) => (
        <li key={elt[1]} className={base_style}>
          <Link href={elt[1]}>{elt[0]}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar_elts;
