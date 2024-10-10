const Item = require('../models/itemModel');


exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createItem = async (req, res) => {
    const { name, description, price, sku } = req.body;
    const item = new Item({ name, description, price, sku });

    try {
    const newItem = await item.save();
    res.status(201).json(newItem);
} catch (err) {
    res.status(400).json({ message: err.message });
}
};


exports.updateItem = async (req, res) => {
    try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item no encontrado' });

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.price = req.body.price || item.price;
    item.sku = req.body.sku || item.sku;

    const updatedItem = await item.save();
    res.json(updatedItem);
} catch (err) {
    res.status(400).json({ message: err.message });
}
};


exports.deleteItem = async (req, res) => {
    try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item no encontrado' });

    await item.remove();
    res.json({ message: 'Item eliminado' });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};
