import axios from "axios";
import CONSTANTS from "../contants";

const UPLOAD_DOCUMENT = async (docfile: any, id: any) => {
  const url = `${CONSTANTS.DATABASE_URL}/document/society/${id}`;
  await axios
    .patch(url, docfile)
    .then((data) => {
      console.log("🚀 ~ file: AdminService.tsx ~ line 85 ~ .then ~ data", data);
    })
    .catch((e) => {
      console.log(
        "🚀 ~ file: AdminService.tsx ~ line 89 ~ constUPLOAD_DOCUMENT= ~ e",
        e
      );
    });
};

const ADMIN_SERVICE = {
  UPLOAD_DOCUMENT,
};
export default ADMIN_SERVICE;
