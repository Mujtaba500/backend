import productModel from "../../model/product/product.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await productModel.findAll();
      if (products.length == 0) {
        res.status(404).json({
          message: "No products found",
        });
      } else {
        res.json(products);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getSingle: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productModel.findByPk(id);
      if (!product) {
        res.status(404).json({
          message: "Product with tis doesnot exist",
        });
      } else {
        res.json({
          data: product,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const { productName, productStock, price } = req.body;
      const product = new productModel();

      product.productName = productName;
      product.productStock = productStock;
      product.price = price;

      await product.save();
      res.json({
        message: "Product Added",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const productToDelete = await productModel.findByPk(id);
      if (!productToDelete) {
        res.status(404).json({
          message: "Product you are trying to delete does not exist",
        });
      } else {
        await productModel.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Product deleted successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default productController;
