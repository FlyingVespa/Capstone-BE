import Product from "../schema/product.schema.js";

export const isUnique = async (req, res, next) => {
  try {
    // const userId = await req.params.userId;
    // const user = await User.findById()
    let product = await Product.findOne({
      businessId: req.body.businessId,
      product: req.body.product,
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
