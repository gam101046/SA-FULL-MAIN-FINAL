import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProductsBySellerId, GetSellerByMemberId } from "../../../services/http/index";
import "./MyProducts.css";
import { SellerInterface } from "../../../interfaces/Seller";
import ShopRating from "../../Review/ReviewSeller/ShopRating";
import Navbarproducts from "../../../component/navbarproducts";

const { Meta } = Card;

interface Products {
  ID: number;
  Title: string;
  Price: number;
  PictureProduct: string;
  Description: string;
  SellerID: number;
  OrderID?: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // Seller state
  const [seller, setSeller] = useState<SellerInterface | null>(null);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [isShopRatingVisible, setIsShopRatingVisible] = useState(false); 


  // Fetch products by seller ID
  const fetchProductsBySellerId = async (sellerId: number) => {
    const res = await GetProductsBySellerId(sellerId, 1, 10); // Assuming page 1 and 10 products per page
    if (res) {
      const availableProducts = res.products.filter((product: Products) => product.Status === 'Available');
      setProducts(availableProducts); // Set only available products
    } else {
      messageApi.error("Error fetching products for seller");
    }
  };


  // Function to fetch seller by member_id
  const fetchSeller = async (member_id: number) => {
    const res = await GetSellerByMemberId(member_id); // Call the function
    if (!res.error) {
      setSeller(res.seller); // Set the seller object
      setSellerId(res.seller_id); // Set the seller ID
      fetchProductsBySellerId(res.seller_id); // Fetch products for this seller
    } else {
      message.error(res.error);
    }
    console.log("Form values:", res);
  };

  // Fetch the seller when the component mounts or the member_id changes
  useEffect(() => {
    const memberId = Number(localStorage.getItem("id")); // Assuming member_id is stored in localStorage
    if (memberId) {
      fetchSeller(memberId); // Fetch seller using the member ID
    }
  }, []);

  const goToProductPage = () => {
    navigate('/HomeSeller');
  };

  const goToReviwe = () => {
    navigate('/ReviewSeller');
  };

  const handleToEditProduct = (id: number) => {
    // When clicking on a product, navigate to /EditProducts with the product ID
    navigate(`/EditProducts/${id}`);
  };

  const handleCreateProduct = () => {
    navigate('/createproducts'); // Navigate to ApplyToSeller page
  };
  const handleShopRating = () => {
    setIsShopRatingVisible(true); // Open the modal
  };
  const closeShopRating = () => {
    setIsShopRatingVisible(false); // Close the modal
  };


  return (
    <div className="myproducts">
      {contextHolder}
      <h1>My Products</h1>

      <Navbarproducts/>

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
                    style={{ width: '100%', height: '210px', objectFit: 'cover' }} // ปรับขนาดรูปภาพ
                  />
                }
                onClick={() => handleToEditProduct(product.ID)} // Navigate to product edit page
              >
                <Meta title={product.Title} description={`ราคา: ${product.Price} บาท`} />
              </Card>
            ))
          ) : (
            <p>ไม่มีสินค้าที่แสดงผล</p>
          )}
      </div>
      <ShopRating
        sellerID={sellerId} // You can replace this with the actual seller ID
        visible={isShopRatingVisible}
        onClose={closeShopRating}
      />
    </div>
  );
};

export default Index;
