'use client';
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import logout from '@/assests/logout.png';
import logo from "@/assests/Logo (1).png";
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "@/Redux/store";
import { IconType } from "react-icons";
import { AiOutlineUnorderedList, AiOutlineHistory, AiOutlinePlusCircle } from "react-icons/ai"; // Example icons
import { FaRegClipboard } from "react-icons/fa6";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation: { label: string, route: string, iconPath: IconType, subMenu?: { label: string, route: string, iconPath: IconType }[] }[] = [
  { label: "Dashboard", route: "/", iconPath: MdDashboard },
  // {
  //   label: "Employee", route: "#", iconPath: FaUsers, subMenu: [
  //     { label: "Employee Database", route: "/employee/database", iconPath: AiOutlineUnorderedList },
  //     { label: "Add New Employee", route: "/employee/add", iconPath: AiOutlinePlusCircle },
  //     { label: "Performance Report", route: "/employee/performance-report", iconPath: AiOutlineUnorderedList },
  //     { label: "Performance History", route: "/employee/performance-history", iconPath: AiOutlineHistory }
  //   ]
  // },
  // { label: "Payroll", route: "/payroll", iconPath: TbTransactionDollar },
  // { label: "Attendance", route: "/attendance", iconPath: AiOutlineUnorderedList },
  // { label: "Request Center", route: "/request-center", iconPath: AiOutlineUnorderedList },
  // { label: "Career Database", route: "#", iconPath: AiOutlineUnorderedList },
  { label: "Notice Board", route: "/notice-board", iconPath: FaRegClipboard },
];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { name } = useSelector((state: RootState) => state.Auth);
  const route = useRouter();

  const renderNavItem = (item: { label: string, route: string, iconPath: IconType, subMenu?: { label: string, route: string, iconPath: IconType }[] }) => {
    const isActive = path === item.route;

    return (
      <li key={item.route} >
        <Link
          href={item.route}
          className={`relative rounded-lg flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all my-3 duration-300 ${isActive ? "poppins-semibold text-white border-l-4 border-primary  bg-gradient-to-r from-primary/90 to-primary/75" : "text-black border-l-4 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-primary/80 hover:to-primary/65 hover:text-black"}`}
        >
          <item.iconPath className="ml-2" size={20} />
          {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate">{item.label}</span>}
        </Link>
        {item.subMenu && isOpen && (
          <ul className="ml-6 mt-2 space-y-1 px-5">
            {item.subMenu.map(subItem => (
              <li key={subItem.route}>
                <Link
                  href={subItem.route}
                  className={`flex items-center text-sm pr-6 py-[10px] pl-[24px] transition-all duration-300 ${path === subItem.route ? "text-primary font-semibold" : "text-black"}`}
                >
                  <subItem.iconPath className="ml-2" size={18} />
                  <span className="ml-3">{subItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("accessToken");
    route.push("/login");
  };

  return (
    <div className="relative flex">
      <button
        onClick={toggleSidebar}
        className="absolute z-50 top-4 left-4 text-black p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`h-screen bg-white duration-300 flex flex-col font-inter ${isOpen ? 'w-[270px]' : 'w-[80px]'}`}>
        {isOpen && (
          <Link href="/" className="flex justify-center mt-5 mb-2">
            <Image width={120} height={120} className=" w-40 object-cover mt-14" src={logo} alt="logo_image" />
          </Link>
        )}

        <div className={`flex flex-col justify-between h-screen pb-11 ${isOpen ? "pt-0" : 'pt-14'}`}>
          <div className="space-y-3">
            <ul className="pt-2 pb-4 space-y-1 text-sm px-4">{navigation.map(renderNavItem)}</ul>
          </div>

          <div>
            <div className="flex px-8 space-x-2 text-lg">
              <FaRegUser className="text-2xl text-primary" />
              <p className="font-semibold text-primary lg:block hidden">Hello, {name}</p>
            </div>
            <button
              onClick={handleLogOut}
              className={`relative flex items-center h-11 pr-6 py-[10px] pl-[24px] text-lg transition-all duration-300 poppins-semibold hover:bg-gradient-to-r hover:from-[primary]/80 hover:to-[#B80069]/60 to-white text-black border-l-4 ${isOpen ? '' : 'justify-center'}`}
            >
              <Image src={logout} alt="logout" width={20} height={20} className="ml-2" />
              {isOpen && <span className="ml-3 text-[18px] tracking-wide truncate ">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSlider;
