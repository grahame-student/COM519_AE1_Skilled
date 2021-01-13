exports.view = async (req, res) => {
  console.log(req.session);
  try {
    res.render('viewAssessment', {});
  } catch (e) {
    res.status(404).send({
      message: 'error rendering page'
    });
  }
};
