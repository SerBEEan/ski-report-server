function notFound(req, res) {
    res.status(404);

    return res.send({ message: 'page not found' });
}

module.exports = { notFound };
