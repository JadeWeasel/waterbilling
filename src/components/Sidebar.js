import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiFillAccountBook, AiOutlineHome } from "react-icons/ai";
import { BsNewspaper, BsCash } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const sidebarItems = [
  {
    name: "Үндсэн хэсэг",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Төлбөрийн мэдээлэл",
    href: "/payment-info",
    icon: BsCash,
  },
  {
    name: "Заалт илгээх",
    href: "/send-report",
    icon: AiFillAccountBook,
  },
  {
    name: "Мэдээ мэдээлэл",
    href: "/news",
    icon: BsNewspaper,
  },
  {
    name: "Хувийн мэдээлэл",
    href: "/profile",
    icon: CgProfile,
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  const handleLogout = () => {
    // Clear any user data from local storage or session storage if needed
    localStorage.removeItem("token");
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="sidebar__wrapper">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            className="sidebar__logo"
            src="/logo.jpg"
            alt="logo"
          />
          <p className="sidebar__logo-name">Billing System</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => (
            <li className="sidebar__item" key={name}>
              <Link
                className={`sidebar__link ${
                  router.pathname === href ? "sidebar__link--active" : ""
                }`}
                href={href}
              >
                <span className="sidebar__icon">
                  <Icon />
                </span>
                <span className="sidebar__name">{name}</span>
              </Link>
            </li>
          ))}
          <li className="sidebar__item" onClick={handleLogout}>
            <button className="logout-button">Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
