import Product from "../model/productModel.js";

// Existing createProduct function
export const createProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.name ||
    !product.price ||
    !product.description ||
    !product.category ||
    !product.imageUrl ||
    !product.countInStock
  ) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  //create new product icluding user id
  const newProduct = new Product({ ...product, user: req.user.id });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in getting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const pagesize = parseInt(req.query.limit) || 10; //default 10 items per page
    const page = parseInt(req.query.page) || 1; //default to first page
    const keywords = req.query.keywords
      ? {
          name: {
            $regex: req.query.keywords,
            $options: "i", // case-insensitive search
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    //price range filtering
    const priceFilter = {};
    if (req.query.minPrice) {
      priceFilter.price = {
        ...priceFilter.price,
        $gte: parseFloat(req.query.minPrice),
      };
      if (req.query.maxPrice) {
        priceFilter.price = {
          ...priceFilter.price,
          $lte: parseFloat(req.query.maxPrice),
        };
      }
    }

    //combine all filters
    const filter = { ...keywords, ...category, ...priceFilter };

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pagesize)
      .skip(pagesize * (page - 1));
    res.json({
      products,
      page,
      pages: Math.ceil(count / pagesize),
      totalProducts: count,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
