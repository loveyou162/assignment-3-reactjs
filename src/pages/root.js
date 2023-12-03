import { Outlet, json } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default RootLayout;
export async function loader() {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  if (!response.ok) {
    throw json({ message: "Không thể tải dữ liệu" }, { status: 500 });
  }
  const resData = await response.json();
  const dataWithId = resData.map((product, index) => ({
    ...product,
    id: index + 1,
  }));
  return dataWithId;
}
