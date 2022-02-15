exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status) res.status(err.status).send({msg: err.msg});
    else next(err);
}
exports.handlePSQL = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid id entered"})}
    else next(err);
}
exports.handle500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg : "server error"});
}
exports.handleInvalidEndpoint = (req, res,) => {
    res.status(404).send({ msg: "invalid path" });
}