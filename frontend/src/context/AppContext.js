import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_BASE_URL;

export const AppContext = createContext();

export default function AppContextProvider({ children }) {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  const [token,setToken] = useState("");
  const [user,setUser] = useState(null);
  const [orders,setOrders] = useState([]);
  const [order,setOrder] = useState({});

  // sign up form
  const [signUpformData, setSignUpFormData] = useState({
    name: "", email: "", password: "", confirmPassword: ""
  });
  // login form
  const [loginFormData, setLoginFormData] = useState({
    email: "", password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpFormData((prev) => ({ ...prev, [name]: value }));
  }
  const submitSignUp = async (event) => {
    event.preventDefault();
    try {
      setLoginLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signUpformData.name,
          email: signUpformData.email,
          password: signUpformData.password,
          confirmPassword: signUpformData.confirmPassword,
          role: "customer"
        })
      };
      const data = await fetch(baseUrl + "/signup", requestOptions);
      const response = await data.json();
      setLoginLoading(false);
      if(response.success){
        setSignUpFormData({
          name: "", email: "", password: "", confirmPassword: ""
        })
        setCart([]);
        setCartTotal(0);
        toast.success("User Signed Up Successfully Please Login")
        navigate("/login")
      }

      else{
        toast.error(response.message);
      }

    } catch (err) {
      console.log(err);
      setLoginLoading(false);
    }
  }
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }
  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      setLoginLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginFormData.email,
          password: loginFormData.password
        })
      };
      const data = await fetch(baseUrl + "/login", requestOptions);
      const response = await data.json();
      setLoginLoading(false);
      if(response.success){
  
      sessionStorage.setItem("user-email",loginFormData.email);
      sessionStorage.setItem("user-password",loginFormData.password);

        setToken(response.token);
        setUser(response.loginUser);
        setOrders(response.loginUser.orders);
        setLoginFormData({
          email: "", password: "",
        })
        toast.success("User logged in Successfully")
        navigate("/")
      }

      else{
        toast.error(response.message);
      }

    } catch (err) {
      console.log(err);
      setLoginLoading(false);
    }
  }

  const getFromSessionStorage = async ()=>{
    const email = sessionStorage.getItem('user-email');
    const password = sessionStorage.getItem('user-password');
    if(email && password){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      };
      const res = await fetch(baseUrl + "/login", requestOptions);
      const response = await res.json();

      if(response.success){
        setToken(response.token);
        setUser(response.loginUser);
        setOrders(response.loginUser.orders);
      }   
    }
}

  //fetch order
  const fetchOrder = async (id)=>{
    try {
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token
        })
      };
      const data = await fetch(baseUrl + "/user/order/" + id, requestOptions);
      const response = await data.json();
      setOrder(response);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setOrder({});
      setLoading(false);
    }
  }



  // Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await fetch(baseUrl + "/categories");
      const res = await data.json();
      setCategories(res.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setCategories([]);
      setLoading(false);
    }
  }


  // Fetch particular category menu
  const fetchCategoryMenu = async (menuId) => {
    try {
      setLoading(true);
      const data = await fetch(baseUrl + "/category/" + menuId);
      const res = await data.json();
      setCategoryMenu(res.cat.products);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setCategoryMenu([]);
      setLoading(false);
    }
  }

  //Fetch all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      const data = await fetch(baseUrl + "/products");
      const res = await data.json();
      setAllProducts(res.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      setAllProducts([]);
      setLoading(false);
    }
  }
  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const data = await fetch(baseUrl + "/product/" + id);
      const res = await data.json();
      const item = res.data;
      setProduct(item);
    }
    catch (err) {
      console.log(err);
      setProduct({});
      setLoading(false);
    }

  }


  //Add to cart
  const addToCart = async (id) => {
    try {
      const data = await fetch(baseUrl + "/product/" + id);
      const res = await data.json();
      const addedItem = res.data;
      setCart([...cart, addedItem]);
      let newCartTotal = cartTotal + addedItem.price
      setCartTotal(newCartTotal);
      toast.success("Item added to cart");
    }
    catch (err) {
      console.log(err);
      setCart([]);
      setCartTotal(0);
      setLoading(false);
    }

  }
  //Remove from cart
  const removeFromCart = (id) => {
    let removedItem;
    let check = false;

    let newCart = cart.filter((item) => {

      if(check){
        return item;
      }
      else if (item._id != id)
        return item;
      else {
        check=true;
        removedItem = item;
      }
    });

    setCart(newCart);
    let newCartTotal = cartTotal - removedItem.price;
    setCartTotal(newCartTotal);
    toast.error("Item removed from cart");
  }

  const signOut = ()=>{
    sessionStorage.clear()
    setUser(null);
    setToken("");
    setCart([]);
    setCartTotal(0);
    toast.success("User logged out successfully")
    navigate("/");
  }

  const checkout = async ()=>{
    try {
      setLoginLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          products:cart,
          orderValue:cartTotal,
          status:"Under process"
        })
      };
      const data = await fetch(baseUrl + "/user/newOrder", requestOptions);
      const response = await data.json();
      setLoginLoading(false);
      if(response.success){
        toast.success("Order Placed Successfully");
        setOrders(response.updatedUser.orders);
        setCart([]);
        setCartTotal(0);
        navigate("/");
      }

      else{
        toast.error(response.message);
      }

    } catch (err) {
      console.log(err);
      setLoginLoading(false);
    }
    
  }

  const handleCheckOut = ()=>{
    if(user){
      navigate("/checkout")
    }
    else{
      toast.error("Please login to place an order")
      navigate("/login");
    }
  }

  const buyNow = async () => {
    setLoginLoading(true);
    fetch(baseUrl+"/create-checkout-session", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      mode:"cors",
      body: JSON.stringify({
        items: cart,
        Total: cartTotal
      })
    })
    .then(res => {
      setLoginLoading(false);
      checkout();
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({url})=>{
      setLoginLoading(false);
      window.location = url
    })
    .catch(e => {
      setLoginLoading(false);
      console.log(e.error)
    })
  }

  

  const value = {
    categories,
    setCategories,
    loading,
    setLoading,
    categoryMenu,
    setCategoryMenu,
    fetchCategories,
    fetchCategoryMenu,
    addToCart,
    cart,
    setCart,
    removeFromCart,
    fetchAllProducts,
    allProducts,
    setAllProducts,
    fetchProduct,
    product,
    setProduct,
    cartTotal,
    signUpformData,
    handleInputChange,
    submitSignUp,
    loginFormData,
    handleLoginInputChange,
    submitLogin,
    token,
    user,
    signOut,
    checkout,
    orders,
    handleCheckOut,
    order,
    fetchOrder,
    loginLoading,
    buyNow,
    getFromSessionStorage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
