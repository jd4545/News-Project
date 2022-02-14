exports.handleInvalidEndpoint = (req, res,) => {
    res.status(404).send({ msg: "invalid path" });
}