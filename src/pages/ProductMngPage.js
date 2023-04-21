/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, Form, Radio, Modal, message } from "antd";
import ProductList from "../components/ProductList";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import db from '../firebase/db'
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const ProductMngPage = () => {
  // 상품 리스트 []
  const [productList, setProductList] = useState([]);

  // 상품 상세정보 {}
  const [productDetail, setProductDetail] = useState({});
 
  // 상품 등록 input {}
  const [productForm, setProductForm] = useState({
    CATEGORY: "",
    PRODUCT_NM: "",
    SALE_PRICE: "",
    DISCOUNTED_RATE: "",
    DELIVERY_DVSN: "",
  });
 
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editYn, setEditYn] = useState(false);
  const [detailContent, setDetailContent] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 처음 렌더링 시 실행
  useEffect(() => {
    getProductList();
  }, []);

  /**
  * 상품 리스트 가져오기
  *
  * @param {string} categoryId 카테고리ID
  * @return
  */
  const getProductList = async function () {
  try {
    let dataList = [];
    let docData = {};
    const querySnapshot = await getDocs(collection(db, "TBGM_PRODUCT"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      docData = doc.data();
      docData['PRODUCT_ID'] = doc.id;
      dataList.push(docData);
    });
    setProductList(dataList);
    for(let i=0; i<dataList.length; i++) {
      const url = await getDownloadURL(ref(storage, 'images/' + dataList[i]['PRODUCT_ID'] + '.jpg'));
      dataList[i]['IMAGE'] = url;
      setProductList([...dataList]);
    }
  } catch(err) {
    console.log(err);
  }
  };
 
   /**
    * 상품 상세정보 등록
    *
    * @param
    * @return
    */
  const registerItem = function (e) {
    e.preventDefault();

    let data = productForm;
    data['DETAIL_CONTENT'] = detailContent;
    data['IMAGE'] = img.name;
    data['RGST_DATE'] = Timestamp.now();

    let nextStep = true;

    for (const key in data) {
      if(data[key] === "" || data[key] === undefined)
      nextStep = false;
      break;
    };

    // console.log(data);

    if(!nextStep) {
      alert("입력값을 확인해 주세요.");
      return;
    }

    addDoc(collection(db, "TBGM_PRODUCT"), data).then((docRef) => {
      // console.log("Document written with ID: ", docRef.id);
      message.success({
        content: "상품정보 등록 성공",
        className: "custom-class",
      });
      getProductList();
      setIsModalOpen(false);
    }).catch((err) => {
      console.log(err);
    });
  };
 
  // 상품 삭제
  const deleteProduct = (idx) => {
    deleteDoc(doc(db, "TBGM_PRODUCT", idx)).then((res) => {
      message.success({
        content: "상품정보 삭제 성공",
        className: "custom-class",
      });
      getProductList();
    }).catch(function (err) {
      console.log(err);
    });
  }
 
  /**
  * input value 가져오기
  *
  * @param
  * @return
  */
  const getValue = (e) => {
    let { name, value } = e.target;

    console.log(e);

    setProductForm({
      ...productForm,
      [name]: value,
    });
  };
 
  // 상품 등록/수정 버튼 클릭시
  const editProduct = (props) => {
    setEditYn(true);
    setIsModalOpen(true);
    setProductDetail(props);
  };

  // 이미지 업로드시 이미지 프리뷰
  const onChangeImage = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);

        resolve();
      };
    });
  };
 
   return (
     <Fragment>      
       <div className="flex" style={{ marginBottom: "10px" }}>
         <span className="tit-lg">상품관리</span>
         <Button type="primary" onClick={editProduct}>
           상품 등록
         </Button>
       </div>
 
       <ProductList
         productList={productList}
         editProduct={editProduct}
         deleteProduct={deleteProduct}
       />
 
       <Modal
         title="상품 등록"
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         width={700}
         footer={[
           <Button type="primary" key="submit" onClick={registerItem}>
             등록
           </Button>,
         ]}
       >
         {editYn ? (
           // 수정 모드
           <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
             <h3>상품 기본정보</h3>
             <p>{productDetail.PRODUCT_NM}</p>
             <p>{productDetail.SALE_PRICE}</p>
             <Form.Item label="카테고리">
               <Radio.Group name="CATEGORY" onChange={getValue}>
                 <Radio value="가구">가구</Radio>
                 <Radio value="식물/데코">식물/데코</Radio>
                 <Radio value="반려동물">반려동물</Radio>
               </Radio.Group>
             </Form.Item>
             <Form.Item label="상품명">
               <Input
                 name="PRODUCT_NM"
                 value={productDetail.PRODUCT_NM}
                 onChange={getValue}
               />
             </Form.Item>
             <Form.Item label="대표이미지">
               {productForm.IMAGE ? (
                 <img
                   src={productForm.IMAGE}
                   style={{ width: "120px", border: "1px solid #ccc" }}
                   alt=""
                 />
               ) : (
                 <img
                   src={"/noimg2.png"}
                   alt=""
                   style={{ width: "120px", border: "1px solid #ccc" }}
                 />
               )}
               <Input
                 type="file"
                 onChange={(e) => {
                   onChangeImage(e.target.files[0]);
                   setImg(e.target.files[0]);
                 }}
               />
             </Form.Item>
             <Form.Item label="상품가격">
               <Input name="SALE_PRICE" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="할인율">
               <Input name="DISCOUNTED_RATE" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="배송구분">
               <Radio.Group name="DELIVERY_DVSN" onChange={getValue}>
                 <Radio value="일반배송">일반배송</Radio>
                 <Radio value="오늘출발">오늘출발</Radio>
               </Radio.Group>
             </Form.Item>
           </Form>
         ) : (
           // 등록 모드
           <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
             <h6>상품 기본정보</h6>
             <Form.Item label="카테고리">
               <Radio.Group
                 name="CATEGORY"
                 // value="furniture"
                 onChange={getValue}
               >
                 <Radio value="가구">가구</Radio>
                 <Radio value="식물/데코">식물/데코</Radio>
                 <Radio value="반려동물">반려동물</Radio>
               </Radio.Group>
             </Form.Item>
             <Form.Item label="상품명">
               <Input name="PRODUCT_NM" onChange={getValue} />
             </Form.Item>
             <Form.Item label="대표이미지">
               {previewImg ? (
                 <img
                   src={previewImg}
                   style={{ width: "120px", border: "1px solid #ccc" }}
                   alt=""
                 />
               ) : (
                 <img
                   src={process.env.PUBLIC_URL + "/noimg2.png"}
                   alt=""
                   style={{ width: "120px", border: "1px solid #ccc" }}
                 />
               )}
               <Input
                 type="file"
                 onChange={(e) => {
                   onChangeImage(e.target.files[0]);
                   setImg(e.target.files[0]);
                 }}
               />
             </Form.Item>
             <Form.Item label="상품가격">
               <Input name="SALE_PRICE" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="할인율">
               <Input name="DISCOUNTED_RATE" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="배송구분">
               <Radio.Group
                 name="DELIVERY_DVSN"
                 value="일반배송"
                 onChange={getValue}
               >
                 <Radio value="일반배송">일반배송</Radio>
                 <Radio value="오늘출발">오늘출발</Radio>
               </Radio.Group>
             </Form.Item>
             <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setDetailContent(data);
            }}
          />
           </Form>
         )}
       </Modal>
     </Fragment>
   );
 };
 
 export default ProductMngPage;
 