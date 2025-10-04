import Product from "../models/productModel.js";
import productValidiator from "../helper/productValidiator.js";
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    if (req.file.size / (1024 * 1024) > 5) {
      return res.send("file size too large");
    }
    const id = req.id;
    const { error } = productValidiator(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error);
    }
    const { name, price, quantity, manufacturingDate } = req.body;
    const uploadRes = await cloudinary.uploader.upload(req.file.path);
    const newProduct = new Product({
      name,
      price,
      quantity,
      manufacturingDate,
      image: uploadRes.secure_url,
      createdBy: id,
    });
    await newProduct.save();
    return res.status(200).redirect("/home");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wents wrong");
  }
};

export const getProduct = async (req, res) => {
  try {
    let { field, search, page } = req.query;
    let limit = 8;
    page = parseInt(page) || 1;
    const skip = (page - 1) * limit;

    const filter = { isDeleted: false };
    if (field && search) {
      if (field === "price" || field === "quantity") {
        filter[field] = Number(search);
      } else if (field === "manufacturingDate") {
        filter[field] = search;
      }
    }
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);
      const role=req.role;
    return res.render("home.ejs", {
      products,
      totalPage: Math.ceil(total / limit),
      currPage: page,
      role,
      query: req.query || {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

export const getUpdateProduct = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).send("product not found");
    }
    const role=req.role;
    return res.render("updateProduct.ejs", { product,role });
  } catch (error) {
    console.log(error);
    return res.send("something wents wrong");
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.file.size / (1024 * 1024) > 5) {
      return res.send("file size too large");
    }
    const { error } = productValidiator(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error);
    }
    const id = req.params.id;
    const userId = req.id;
    const { name, price, quantity, manufacturingDate } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).send("product not found");
    }
    const existingImage = product.image;
    const publicId = existingImage.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
    const uploadRes = await cloudinary.uploader.upload(req.file.path);
    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        quantity,
        manufacturingDate,
        image: uploadRes.secure_url,
        createdBy: userId,
      },
      { new: true }
    );
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wents wrong");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).send("product not found");
    }
    product.isDeleted = true;
    await product.save();
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wents wrong");
  }
};
