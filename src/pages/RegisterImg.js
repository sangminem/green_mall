/** 
 * @desc 상품정보 등록 화면 (관리자)
 * @auth hy
 * @since 2022.08.24
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form';
 import Container from 'react-bootstrap/Container';
 import Button from 'react-bootstrap/Button';
 import swal from 'sweetalert';
 
 const RegisterImg = () => {
 
    const [content, setContent] = useState("");
    const [uploadedImg, setUploadedImg] = useState({
        fileName: "",
        fillPath: ""
    });
    const BASE_URL = "http://localhost:4000";

    const onChange = e => {
        setContent(e.target.files[0]);
      };

    const onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("img", content); 

        const url = "http://localhost:4000/api/upload";

        axios.post(url, formData)
          .then(res => {
            const { fileName } = res.data;
            console.log(fileName);
            setUploadedImg({ fileName, filePath: `${BASE_URL}/img/${fileName}` });
            alert("The file is successfully uploaded");
          })
          .catch(err => {
            console.error(err);
          });
      };
 
     useEffect(() => {
         
     }, [])
 
     return (
        <>
          <form onSubmit={onSubmit}>
            {uploadedImg ? (
              <>
                <img src={uploadedImg.filePath} alt="" />
                <h3>{uploadedImg.fileName}</h3>
              </>
            ) : (
              ""
            )}
            <input type="file" onChange={onChange} />
            <button type="submit">Upload</button>
          </form>
        </>
      );
   }
 
 
   export default RegisterImg;