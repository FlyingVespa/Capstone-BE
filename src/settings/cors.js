const trustOrigins = [process.env.FRONTEND_PROD_URL];

const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || trustOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  credentials: true,
};

export default corsConfig;
