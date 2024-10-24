import { Card, Image } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className="min-h-screen ">
      <div className="grid sm:grid-cols-3 grid-cols-1 ">
        <div className="col-span-1 flex flex-col p-16 border flex justify-center items-center p-5">
          <div className="">
            <h3 className="text-2xl font-mono ">Hello I'm</h3>
            <h1 className="text-6xl font-mono ">Vicky</h1>
            <h5 className="text-xl font-mono ">Devloper</h5>
            <p className="text-md font-mono font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at
              inventore autem perferendis, sit sunt.
            </p>
          </div>
        </div>
        <div className="col-span-2 p-10 border flex justify-center items-center p-10">
          <Image 
            className="shadow-lg shadow-gray-400/50 "
            src="/peakpx.jpg"
            alt="Default Image"
            width="auto"
            height={400}
            style={{

              borderRadius: "0%", //👈 and here you can select border radius
            }}
          />
        </div>
      </div>
      <div className="grid  grid-cols-3 ">
          <div className="col-span-2 border flex justify-center items-center p-5">
            <p className=" font-mono">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quam ex necessitatibus corporis tempore illum consequuntur recusandae inventore sequi vero.</p>
          </div>
          <div className="col-span-1 border flex justify-center items-center p-5">
          <Image 
            className="shadow-lg shadow-gray-400/50 "
            src="/peakpx2.jpg"
            alt="Default Image"
            width="auto"
            height={100}
            style={{

              borderRadius: "0%", //👈 and here you can select border radius
            }}
          />
          </div>
      </div>
      <div className="grid grid-cols-3 ">
          <div className="col-span-2"></div>
          <div className="col-span-1"></div>
      </div>
    </div>
  );
};

export default Profile;
