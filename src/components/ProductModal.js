/**
 * @desc 상품 등록/수정 모달
 * @auth sangminem
 * @since 2023.04.22
 * */

import { Button, Input, Form, Radio, Modal } from "antd";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from "react";

const ProductModal = (props) => {
    const { isModalOpen, setIsModalOpen, productDetail, setProductDetail, registerItem, previewImg, imageInputTag, editYn } = props;

    useEffect(() => {
        setProductDetail({...productDetail});
    }, [productDetail, setProductDetail]);
    
    const getValue = (e) => {
        let { name, value } = e.target;

        // console.log(e);
        if(e.target.name) {
            setProductDetail({
            ...productDetail,
            [name]: value,
            });
        }
    };

    return (
        <Modal
        title={editYn?'상품 수정':'상품 등록'}
        open={isModalOpen}
        onOk={()=>{setIsModalOpen(true)}}
        onCancel={()=>{setIsModalOpen(false)}}
        width={700}
        footer={[
            <Button type="primary" key="submit" onClick={registerItem}>
            {editYn?'수정':'등록'}
            </Button>,
        ]}
        >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
                <h3>상품 기본정보</h3>
                <Form.Item label="카테고리">
                    <Radio.Group name="CATEGORY" value={productDetail.CATEGORY} onChange={getValue}>
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
                    {previewImg ? (
                    <img
                        src={previewImg}
                        style={{ width: "120px", border: "1px solid #ccc" }}
                        alt=""
                    />
                    ) : (productDetail.IMAGE ? (
                    <img
                        src={productDetail.IMAGE}
                        style={{ width: "120px", border: "1px solid #ccc" }}
                        alt=""
                    />
                    ) : (
                    <img
                        src={"/noimg2.png"}
                        alt=""
                        style={{ width: "120px", border: "1px solid #ccc" }}
                    />
                    ))}
                    <div style={{height: "30px"}}>
                    {imageInputTag}
                    </div>
                </Form.Item>
                <Form.Item label="상품가격">
                    <Input name="SALE_PRICE" type="number" value={productDetail.SALE_PRICE} onChange={getValue} />
                </Form.Item>
                <Form.Item label="할인율">
                    <Input name="DISCOUNTED_RATE" type="number" value={productDetail.DISCOUNTED_RATE} onChange={getValue} />
                </Form.Item>
                <Form.Item label="배송구분">
                    <Radio.Group name="DELIVERY_DVSN" value={productDetail.DELIVERY_DVSN} onChange={getValue}>
                    <Radio value="일반배송">일반배송</Radio>
                    <Radio value="오늘출발">오늘출발</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="상품설명">
                    <CKEditor
                        editor={ClassicEditor}
                        data={productDetail.DETAIL_CONTENT}
                        onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                        setProductDetail({
                            ...productDetail,
                            "DETAIL_CONTENT": data
                        });
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default ProductModal;