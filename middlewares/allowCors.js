export default (req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Referrer-Policy", "same-origin");
  next();
};
