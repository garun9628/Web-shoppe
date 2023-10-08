import ProductDetails from "../features/product/components/ProductDetails";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default ProductDetailsPage;
