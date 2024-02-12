import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const VoucherDetails = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const name = pathname.split("/").pop();
  const data = state;
  console.log({ state });
  return (
    <section className="pt-10">
      <div 
          onClick={() => {
            navigate("/");
          }}
      className="flex cursor-pointer w-[120px] items-center gap-x-4 pl-5">
        <FaArrowLeft
      
        />
        <p>Go Back</p>
      </div>
      <hr className="h-[2px]  my-5    w-full bg-gray-200" />

      <div className="flex  my-[30px] justify-start items-center w-full gap-x-10 px-10">
        <div className="  flex flex-col items-center justify-between pb-10 h-[220px] w-[320px] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <img src={data.icon} alt="" className="h-[52px] mt-9" />
          <p className="text-[#3BA615]">({data.offer})</p>
        </div>
        <div className="flex h-[220px]  flex-col justify-start items-start w-[70%] text-[#12263F]">
          <h1 className="font-bold text-2xl leading-7">{name}</h1>
          <p className="font-medium mb-5 leading-6 opacity-80">
            ({data.offer})
          </p>
          <p className="leading-7 font-[400] opacity-80">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
            itaque dignissimos impedit. Necessitatibus odit, nemo quis
            voluptatem pariatur eum, magni delectus, ipsum corrupti
            exercitationem a dolor? Neque laboriosam necessitatibus odit autem
            voluptatibus labore possimus vitae esse doloremque voluptatum? Iusto
            architecto tempora quis non distinctio labore tenetur!
          </p>
        </div>
      </div>
      <hr className="h-[2px]  mt-2   w-full bg-gray-400" />
    </section>
  );
};

export default VoucherDetails;
