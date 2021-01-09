exports.list = async (req, res) => {
  console.log(req.session);
  try {
    console.log(req.query);
    const message = req.query.message;
    res.render("skills", { message: message });
  } catch (e) {
    res.status(404).send({
      message: 'error rendering page'
    });
  }
};
