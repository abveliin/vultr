import { Parallax, Background } from "react-parallax";
import { Parallax_data } from "./Parallax_data";
import { CldImage } from "next-cloudinary"; //next-cloudinary

const Para = () => {
  /* const ratio_value = aspect_ratio;
  if (aspect_ratio) */
  return (
    <Parallax
      strength={400}
      className="relative flex justify-center items-center w-full aspect-video mt-8 bg-red-900"
    >
      <Background className="w-screen aspect-video">
        <CldImage
          src="my_uploads /ervagdk5yq8ylo8hmbs1"
          alt="image"
          width={3840} // ×
          height={2160}
          placeholder="blur"
          //className="relative object-cover object-center rounded-3xl w-full aspect-video"
        />
      </Background>
      {
        <div className="flex items-center justify-center h-screen aspect-square">
          <h1 className="flex items-center justify-center text-white font-thin">
            what we are doing in Ghana is amazing
          </h1>
        </div>
      }
    </Parallax>
  );
};
export default Para;

{
  /* <Background className="custom-bg">
            <img src={Parallax_data} alt="fill murray" />
        </Background> */
}
