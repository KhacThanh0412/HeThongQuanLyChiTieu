import { dashboard, expenses, transactions, trend } from "../Utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "Trang chủ",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Xem giao dịch",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "Thu nhập",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Hoá đơn",
    icon: expenses,
    link: "/dashboard",
  },
];
