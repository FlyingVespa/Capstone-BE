import Product from "../schema/product.schema.js";

export const isUnique = async (req, res, next) => {
  try {
    const userId = await req.params.userId;
    let product = await Product.findOne({
      product: req.body.product,
      businessId: userId,
    });
    if (!product) {
      next();
    } else {
      res
        .status(400)
        .json(
          `${product.product} already exists, either update existing product or change product name`
        );
    }
  } catch (error) {
    next(error);
  }
};
