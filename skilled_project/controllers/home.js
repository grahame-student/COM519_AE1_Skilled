exports.list = async (req, res) => {
  console.log(req.session);
  try {
    res.render("index", {});
  } catch (e) {
    res.status(404).send({
      message: `error rendering page`,
    });
  }
}
