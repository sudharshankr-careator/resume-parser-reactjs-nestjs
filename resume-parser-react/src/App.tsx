import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import "./App.css";
import ADMIN_SERVICE from "./services/AdminService";

function App() {
  const [file, setFile] = useState("");

  function onChange(e: any) {
    setFile(e.file);
    const formdata = new FormData();
    formdata.append("docfile", e.file);

    const isLt2M = e.file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      alert("File must smaller than 8MB!");
      return;
    }
  }
  return (
    <div className="App">
      <h1>Resume Parser</h1>
      <Upload
        name="file"
        onChange={(e) => onChange(e)}
        customRequest={async (componentsData) => {
          let data = new FormData();
          console.log(componentsData.file, "ggg");

          data.append("docfile", componentsData.file);
          await ADMIN_SERVICE.UPLOAD_DOCUMENT(data, "1")
            .then((data) => {
              console.log("🚀 ~ file: App.tsx ~ line 32 ~ .then ~ data", data);
            })
            .catch((e) => {
              console.log(
                "🚀 ~ file: App.tsx ~ line 36 ~ customRequest={ ~ e",
                e
              );
            });
        }}
        maxCount={1}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "download ",
          showRemoveIcon: true,
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  );
}

export default App;
