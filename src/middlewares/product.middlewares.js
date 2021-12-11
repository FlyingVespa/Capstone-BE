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

export const verifyIfUnique = async (req, res, next) => {
  try {
    const userId = await req.params.userId;
    const productId = await req.paras.productId;
    let product = await Product.find({
      product: productId,
      businessId: userId,
    });
    if (product.length <= 1) {
      next();
    } else {
      res
        .status(400)
        .json(
          `${product.product} already exists, either update existing product or change product name`
        );
    }
  } catch (error) {}
};
