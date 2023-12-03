import { useRouteLoaderData } from "react-router";

import InfoProduct from "../component/Detail/InfoProduct";
function DetailPage() {
  const data = useRouteLoaderData("root");
  console.log(data[1]._id.$oid);
  return (
    <>
      <InfoProduct />
    </>
  );
}
export default DetailPage;
