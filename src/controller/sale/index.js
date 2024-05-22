import saleModel from "../../model/sale/index.js";
import saleProductModel from "../../model/sale/saleProduct.js";
import productModel from "../../model/product/product.js";

const saleController = {
  getAll: async (req, res) => {
    try {
      const sales = await saleModel.findAll();
      if (sales.length == 0) {
        res.status(404).json({
          message: "No Sales have been made",
        });
      } else {
        res.json(sales);
      }
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getSaleById: async (req, res) => {
    try {
      const id = req.params.id;
      const sale = await saleModel.findByPk(id, {
        include: [
          {
            model: saleProductModel,
            include: [
              {
                model: productModel,
                attributes: ["productName"],
              },
            ],
          },
        ],
      });
      if (!sale) {
        res.status(404).json({
          message: "Sale not found",
        });
      } else {
        res.json({
          data: sale,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getSaleByProduct: async (req, res) => {
    try {
      const productName = req.params.product;
      const products = await saleProductModel.findAll({
        where: {
          productName: productName,
        },
      });
      if (products.length == 0) {
        res.status(404).json({
          message: "Sales with this product name not found",
        });
      } else {
        const sales = [];
        for (let i = 0; i < products.length; i++) {
          const id = products[i].SaleId;
          const saleWithId = await saleModel.findOne({
            where: {
              id: id,
            },
            include: [
              {
                model: saleProductModel,
                attributes: [
                  "productName",
                  "productQuantity",
                  "rate",
                  "ProductId",
                ],
              },
            ],
          });
          if (!saleWithId) {
            continue;
          } else {
            sales.push(saleWithId);
          }
        }
        res.json({
          message: sales,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const saleProducts = payload.salesProducts;
      const sale = new saleModel();

      let saleAmount = 0;

      for (let i = 0; i < saleProducts.length; i++) {
        const product = await productModel.findOne({
          where: {
            id: saleProducts[i].ProductId,
          },
        });
        if (product.productStock < saleProducts[i].productQuantity) {
          return res.status(400).json({
            message: `The product with name ${product.productName} has insufficient stock`,
          });
        }
        product.productStock -= saleProducts[i].productQuantity;
        await product.save();
        saleAmount += saleProducts[i].productQuantity * saleProducts[i].rate;
      }

      sale.totalAmount = saleAmount;

      await sale.save();

      const saleProductsWithIds = saleProducts.map((ele) => {
        return {
          ...ele,
          SaleId: sale.id,
        };
      });
      await saleProductModel.bulkCreate(saleProductsWithIds);
      res.json({
        message: "Sale made successfully",
        sale,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
        err,
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { productName, productQuantity, rate } = req.body;
      const productToUpdate = await saleProductModel.findOne({
        where: {
          SaleId: id,
          productName: productName,
        },
      });
      if (!productToUpdate) {
        res.status(404).json({
          message: "Sale not found",
        });
      } else {
        const saleToUpdate = await saleModel.findByPk(id);

        saleToUpdate.totalAmount -=
          productToUpdate.productQuantity * productToUpdate.rate;

        if (productName) {
          productToUpdate.productName = productName;
        }
        if (productQuantity) {
          productToUpdate.productQuantity = productQuantity;
        }
        if (rate) {
          productToUpdate.rate = rate;
        }

        await productToUpdate.save();

        saleToUpdate.totalAmount +=
          productToUpdate.productQuantity * productToUpdate.rate;

        await saleToUpdate.save();

        res.json({
          message: "sale updated",
          saleToUpdate,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const saleToDelete = await saleModel.findByPk(id);
      if (!saleToDelete) {
        res.status(404).json({
          message: "sale with this id doesnot exist",
        });
      } else {
        await saleProductModel.destroy({
          where: {
            SaleId: id,
          },
        });
        await saleModel.destroy({
          where: {
            id: id,
          },
        });
        res.json({
          message: "Sale deleted successfully",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default saleController;
