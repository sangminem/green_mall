/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import ProductList from "../components/ProductList";

import db from '../firebase/db';
import storage from '../firebase/storage';
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import ProductModal from "../components/ProductModal";

const ProductMngPage = () => {
  // 상품 리스트 []
  const [productList, setProductList] = useState([]);

  // 상품 상세정보 {}
  const initProductDetail = {
    CATEGORY: "",
    PRODUCT_NM: "",
    SALE_PRICE: "",
    DISCOUNTED_RATE: "",
    DELIVERY_DVSN: "",
    DETAIL_CONTENT: ""
  }
  const [productDetail, setProductDetail] = useState(initProductDetail);
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editYn, setEditYn] = useState(false);
  const [imageInputTag, setImageInputTag] = useState(null);

  // 처음 렌더링 시 실행
  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    setProductDetail(productDetail);
  }, [productDetail]);  

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
        try{
          const url = await getDownloadURL(ref(storage, 'images/' + dataList[i]['PRODUCT_ID'] + '.jpg'));
          dataList[i]['IMAGE'] = url;
        } catch(err) {
          dataList[i]['IMAGE'] = '/noimg.jpg';
        }
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

    let data = productDetail;
    data['RGST_DATE'] = Timestamp.now();

    let nextStep = true;

    for (const key in data) {
      // console.log(key, data[key]);
      if(data[key] === "" || data[key] === undefined) {
        nextStep = false;
        break;
      }
    };

    console.log(data);
    // console.log(img);

    if(!nextStep) {
      alert("입력값을 확인해 주세요.");
    } else {
      const saveData = {...data};
      delete saveData["PRODUCT_ID"]; //ID는 필드로 저장하지 않음
      delete saveData["IMAGE"]; //이미지 정보는 따로 저장하지 않음
      if(editYn) {
        updateDoc(doc(db, "TBGM_PRODUCT", data["PRODUCT_ID"]), saveData).then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          setIsModalOpen(false);
          const successMessage = "상품정보 수정 성공";
          if(img !== undefined) {
            uploadImage(img, 'images/' + data["PRODUCT_ID"] + '.jpg', () => {
              getProductList();
              message.success({
                content: successMessage,
                className: "custom-class",
              });
            });
          } else {
            message.success({
              content: successMessage,
              className: "custom-class",
            });
          }
        }).catch((err) => {
          console.log(err);
        });

      }else{
        addDoc(collection(db, "TBGM_PRODUCT"), saveData).then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          setIsModalOpen(false);
          const successMessage = "상품정보 등록 성공";
          if(img !== undefined) {
            uploadImage(img, 'images/' + docRef.id + '.jpg', () => {
              getProductList();
              message.success({
                content: successMessage,
                className: "custom-class",
              });
            });
          } else {
            message.success({
              content: successMessage,
              className: "custom-class",
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  };

  // 이미지 업로드
  const uploadImage = (file, path, callback) => {
    const storageRef = ref(storage, path);
    const metadata = {
      contentType: 'image/jpeg',
    };

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      // console.log('Uploaded a blob or file!');
      callback();
    }).catch((err) => {
      console.log(err);
      message.success({
        content: "이미지 업로드 실패",
        className: "custom-class",
      });
    });
  }
 
  // 상품 삭제
  const deleteProduct = (idx) => {
    deleteDoc(doc(db, "TBGM_PRODUCT", idx)).then((res) => {
      getProductList();
      deleteImage('images/' + idx + '.jpg', () => {
        message.success({
          content: "상품정보 삭제 성공",
          className: "custom-class",
        });
      })
    }).catch(function (err) {
      console.log(err);
      message.success({
        content: "상품정보 삭제 실패",
        className: "custom-class",
      });
    });
  }
 
  // 이미지 삭제
  const deleteImage = (path, callback) => {
    const storageRef = ref(storage, path);
    deleteObject(storageRef).then(() => {
      callback();
    }).catch((err) => {
      console.log(err);
      message.success({
        content: "이미지 삭제 실패",
        className: "custom-class",
      });
    });
  }

  /**
  * input value 가져오기
  *
  * @param
  * @return
  */

  // 상품 등록/수정 버튼 클릭시
  const editProduct = (props) => {
    setEditYn(props.editYn);

    const inputTag = <Input
      type="file"
      onChange={(e) => {
        if(e.target.files[0] !== undefined) {
          onChangeImage(e.target.files[0]);
          setImg(e.target.files[0]);
        } else {
          setImg("");
        }
      }}
    />
    setIsModalOpen(true);
    setPreviewImg(null);
    setImageInputTag(null);
    setProductDetail(initProductDetail);
    setTimeout(() => {
      setProductDetail(props.productDetail);
      setImageInputTag(inputTag);
    }, 200);
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
        <Button type="primary" onClick={() => {
          editProduct({"productDetail": initProductDetail, "editYn": false});
        }}>
          상품 등록
        </Button>
      </div>

      <ProductList
        productList={productList}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />

      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        registerItem={registerItem}
        productDetail={productDetail}
        setProductDetail={setProductDetail}
        previewImg={previewImg}
        editYn={editYn}
        imageInputTag={imageInputTag}
        setImageInputTag={setImageInputTag}
        initProductDetail={initProductDetail}
      />
    </Fragment>
  );
};
 
export default ProductMngPage;
 