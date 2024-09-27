import {  Card,  message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetProductsByTitle} from "../../../services/http/index";
import "./searchproducts.css";
import NavbarMember from "../../../component/NavbarSearch";
const { Meta } = Card;

interface Products {
  ID: number;
  Title: string;
  Price: number;
  PictureProduct: string;
  Description: string;
  SellerID: number;
  OrderID?: number;
  Status: String
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { title } = useParams<{ title: string }>(); 
  const [products, setProducts] = useState<Products[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>(title || ""); 
  const [messageApi, contextHolder] = message.useMessage();
  const MemberID = Number(localStorage.getItem("id"));

  // Function to fetch products by title
  const fetchProductsByTitle = async () => {
    try {
      const result = await GetProductsByTitle(searchTitle);
      console.log('API result:', result);
      
      if (Array.isArray(result)) {
        const availableProducts = result.filter(product => product.Status === "Available");
        setProducts(availableProducts);
      } else {
        console.error('Data format is incorrect:', result);
        messageApi.open({
          type: "error",
          content: "ข้อมูลที่ได้รับจาก API ไม่ถูกต้อง",
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      });
    }
  };
  

  const handleProductClick = (id: number) => {
    navigate(`/BuyProduct/${id}`);
  };

  useEffect(() => {
    if (title) {
      setSearchTitle(title);
      fetchProductsByTitle();
    }
  }, [title]);

  useEffect(() => {
    if (searchTitle) {
      fetchProductsByTitle();
    } else {
      setProducts([]);
    }
  }, [searchTitle]);


  return (
    <div className="myproducts">
      {contextHolder}
      <NavbarMember/>
      <h1 style={{ color: 'back', fontSize: '24px', margin: 0,marginTop: 90 ,marginRight: 1200}}>รายการค้นหา </h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <Card
              key={product.ID}
              hoverable
              style={{ width: 240, height: 350, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              cover={
                <img
                  alt={product.Title}
                  src={product.PictureProduct || 'https://via.placeholder.com/240'}
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  onClick={() => handleProductClick(product.ID)} 
                />
              }
            >
              <Meta title={product.Title} description={`ราคา: ${product.Price} บาท`} />
            </Card>
          ))
        ) : (
          <p>ไม่มีสินค้าที่แสดงผล</p>
        )}
      </div>
    </div>
  );
};

export default Index;
