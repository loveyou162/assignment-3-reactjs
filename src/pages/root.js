import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import axios from "axios";
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
  try {
    const response = await axios.get("http://localhost:5000/shop/all-product", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // Do something with the data...
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
