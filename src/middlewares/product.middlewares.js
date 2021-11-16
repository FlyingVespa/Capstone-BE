import Product from "../schema/product.schema.js";

export const isUnique = async (req, res, next) => {
  try {
    let product = await Product.findOne({ product: req.body.product });
    if (!product) {
      next();
    } else {
      res
        .status(400)
        .send(
          `${product.product} already exists, either update existing product or change product name`
        );
    }
  } catch (error) {
    next(error);
  }
};
