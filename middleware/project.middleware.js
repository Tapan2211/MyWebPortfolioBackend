const validate = (schema) => (req, res, next) => {
    const combinedData = { ...req.body, image: req.file ? `/uploads/${req.file.filename}` : undefined };
    const { error } = schema.validate(combinedData);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = validate;
