import {
  BookOpenText,
  Gauge,
  Hexagon,
  Layers2,
  Layers3,
  ShoppingBasket,
  ShoppingCart,
  Tag,
  UserCog2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const AdminPanel = [
  {
    name: "Users",
    link: "/admin/users",
    description: "Monitor and manage all the users of the website.",
    icon: <UserCog2 className="h-full w-full" />,
    color: "text-green-500",
  },
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    description: "View and compare the statistics of the website.",
    icon: <Gauge className="h-full w-full" />,
    color: "text-blue-500",
  },
  {
    name: "Products",
    link: "/admin/products",
    description: "Manage all the products of the website.",
    icon: <ShoppingBasket className="h-full w-full" />,
    color: "text-yellow-500",
  },
  {
    name: "Orders",
    link: "/admin/orders",
    description: "Manage all the orders of the website.",
    icon: <ShoppingCart className="h-full w-full" />,
    color: "text-red-500",
  },
  {
    name: "Categories",
    link: "/admin/categories",
    description: "Manage all the categories of the website.",
    icon: <Layers2 className="h-full w-full" />,
    color: "text-purple-500",
  },
  {
    name: "Subcategories",
    link: "/admin/subcategories",
    description: "Manage all the subcategories of the website.",
    icon: <Layers3 className="h-full w-full" />,
    color: "text-pink-500",
  },
  {
    name: "Brands",
    link: "/admin/brands",
    description: "Manage all the brands of the website.",
    icon: <Hexagon className="h-full w-full" />,
    color: "text-indigo-500",
  },
  {
    name: "Tags",
    link: "/admin/tags",
    description: "Manage all the tags of the website.",
    icon: <Tag className="h-full w-full" />,
    color: "text-gray-500",
  },
  {
    name: "Reviews",
    link: "/admin/reviews",
    description: "Manage all the reviews of the website.",
    icon: <BookOpenText className="h-full w-full" />,
    color: "text-gray-500",
  },
];

const Admin = () => {
  return (
    <div>
      <div className="w-full h-52 flex items-center justify-center text-white flex-col bg-gradient-to-r from-sky-500 to-blue-700">
        <h1 className="text-4xl font-bold font-[sans serif]">
            Welcome to the Admin Homepage
        </h1>
        <p className="text-xl font-semibold">
            Here, you can manage all the administrative tasks.
        </p>
      </div>
      <div className="grid grid-cols-3 items-center justify-center gap-x-4 gap-y-4 mt-5 md:grid-cols-4 sm:grid-cols-3">
        {AdminPanel.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            className="bg-gray-100 p-4 hover:scale-105 rounded-lg transition shadow-md flex flex-col items-center justify-center"
          >
            <div className={`h-16 w-16 ${item.color}`}>{item.icon}</div>
            <h2 className="text-2xl font-bold font-[sans serif] text-gray-700">
              {item.name}
            </h2>
            <p className="text-gray-500 font-semibold">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
