import { sideBarArr } from "../../constants/constants";
import { JHCCllinic, g32 } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside className="w-[14.8vw] bg-white h-screen fixed left-0 top-0">
      <div className="w-full py-5 flex justify-start items-center gap-4 px-4">
        <img src={g32} alt="" />
        <img src={JHCCllinic} alt="" />
      </div>

      <div className="mt-12">
        {sideBarArr.map((element, index) => (
          <div
            className={`${
              element.path === location.pathname
                ? "border-l-4 border-JHC-Primary bg-JHC/Light text-JHC-Primary font-bold"
                : ""
            } w-full py-4 hover:bg-JHC/Light cursor-pointer text-sm mt-7 flex justify-start items-center gap-4 px-4 border-black`}
            key={index}
            onClick={() => navigate(`${element.path}`)}
          >
            <div>
              {element.path === location.pathname
                ? element.iconActive
                : element.icon}
            </div>
            <p>{element.label}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
