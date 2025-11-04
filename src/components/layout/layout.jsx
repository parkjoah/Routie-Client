import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { BottomNavBar } from "./BottomNavBar";

export const Layout = () => {
  return (
    <div className="relative min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 overflow-y-auto pt-[60px] pb-[80px]">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
};
