import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

  //const DEV_BASE_URL = "http://localhost:3000"


function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
  
    try {
        // Prepare order data
        const orderData = {
            customer_id: parseInt(userInfo.name),
            total_price: 0,  // Initialize total_price to 0 or calculate if needed
            status: "checking",
        };
    
        // Step 1: Create the order
        const orderResponse = await axios.post("http://localhost:3000/orders", orderData);
        const order = orderResponse.data;
    
        // Step 2: Create order items sequentially
        for (const [productId, quantity] of Object.entries(cart)) {
            const product = products.find(p => p.product_id === parseInt(productId));
            if (product) {
                const newItem = {
                    product_id: productId,
                    quantity: quantity,
                    price: product.price,
                };
    
                await axios.post(`http://localhost:3000/orders/${order.order_id}/items`, newItem);
            }
        }
    
        // Step 3: Update order status to completed
        await axios.put(`http://localhost:3000/orders/${order.order_id}`, {
            status: "completed",
        });
    
        // Clear the cart and reset checkout state
        setCart({});
        setIsCheckingOut(false);
        setOrder(order);
    } catch (error) {
        console.error("Error during checkout:", error);
        setError("An error occurred during checkout. Please try again.");
        setIsCheckingOut(false);
    }
};







  const fetchProducts = async (params = {}) => {
    try {

      const response = await axios.get("http://localhost:3000/products", {params});
      console.log("Fetched products", response.data);
      setProducts(Array.isArray(response.data) ? response.data : []);
    }
    catch (error){
      console.log("Error fetching products: ", error);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 