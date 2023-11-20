import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Shop.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import Skeleton from "react-loading-skeleton";
const Shop = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Seçilen kategori
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(true);

  const pageTitle = "Our Shop - Best Products";
  const pageDescription =
    "Explore our wide range of products in our online shop.";

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then((response) => {
      setProducts(response.data.products);
      setOriginalProducts(response.data.products);
      setLoading(false);
    });

    axios.get("https://dummyjson.com/products/categories").then((response) => {
      setCategories(response.data);
      setLoading(false);
    });
  }, []);

  const filteredProduct = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    // Şimdi `searchTerm` değişkeni, inputun değerini içeriyor.
    // Bu değeri kullanabilirsiniz.
    if (searchTerm.trim() === "") {
      setProducts(originalProducts);
    } else {
      const searchedProducts = originalProducts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(searchedProducts);
    }
  };

  const addToCartHandle = (item) => {
    dispatch(
      cartActions.addItem({
        ...item,
        quantity: 1,
      })
    );
  };
  const Loading = () => {
    return (
      <>
        <div className="skeleton-loadinng mt-2">
          <div className="container">
            <div className="row g-1">
              <div className="col-md-2 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "80px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "80px" }} />
              </div>
              <div className="col-md-7 col-sm-4 col-12">
                <Skeleton style={{ width: "100%", height: "80px" }} />
              </div>
            </div>
            <div className="row g-1 mt-3">
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
              <div className="col-md-3 col-sm-4 col-6">
                <Skeleton style={{ width: "100%", height: "300px" }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const handleChange = (e) => {
    const selectedSortType = e.target.value;
    setSortType(selectedSortType);

    // Sıralama türüne göre ürünleri sırala
    if (selectedSortType === 'ascending') {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else if (selectedSortType === 'descending') {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  };
  return (
    <div className="shop mt-5">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="container-md">
          <div className="row g-3">
            <div className="col-lg-3 col-md-4 col-sm-6 col-5">
              <div className="filter-widget">
                <select
                  placeholder="Sort by"
                  className="select"
                  value={sortType}
        onChange={handleChange}
                >
                  <option value="">Sorting</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-7">
              <div className="filter-widget">
                <select
                  className="select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Products</option>
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-12 col-12">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <span>
                  <AiOutlineSearch />
                </span>
              </div>
            </div>
            <div className="row g-1 mt-4">
              {filteredProduct.length === 0 ? (
                <h3 className="text-center mt-5">No products are found!</h3>
              ) : (
                filteredProduct?.map((item, index) => (
                  <div className="col-lg-3 col-md-4 col-6" key={index}>
                    <div className="flashCard">
                      <Link to={`/product/${item.id}`}>
                        <div className="img-div">
                          <img src={item.images[0]} alt="" />
                        </div>
                      </Link>
                      <div className="title-box">
                        <h6>{item.title.substring(0, 25)}</h6>
                      </div>
                      {/* <div className="rating-box">
                        <span>
                          <AiFillStar className="rating" /> {item.rating}
                        </span>
                      </div> */}
                      <div className="price-box">
                        <p className="price-item">
                          <span>{item.price}</span>
                          <i className="p-1  fa-solid fa-dollar-sign"></i>
                        </p>
                        <div className="btn-box">
                          <button
                            className="btn-cart"
                            onClick={() => addToCartHandle(item)}
                          >
                            <span>
                              <i className="fa-solid fa-cart-shopping"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
