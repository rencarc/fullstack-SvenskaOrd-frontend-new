const SvenskaOrdModel = require('../models/SvenskaOrdModel');

// 获取所有数据
exports.getSvenskaOrd = async (req, res) => {
    try {
        const svenskaOrd = await SvenskaOrdModel.find();
        res.status(200).json(svenskaOrd);
    } catch (error) {
        console.error('Error fetching SvenskaOrd:', error);
        res.status(500).json({ error: 'Failed to fetch SvenskaOrd' });
    }
};

// 保存数据
exports.saveSvenskaOrd = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { swedish, english, example } = req.body;
        
        if (!swedish) {
            return res.status(400).json({ error: "Swedish text is required" });
        }
        
        const data = await SvenskaOrdModel.create({ swedish, english, example });
        res.status(201).json(data);
    } catch (error) {
        console.error('Error saving SvenskaOrd:', error);
        res.status(500).json({ error: 'Failed to save SvenskaOrd' });
    }
};

// 更新数据
exports.updateSvenskaOrd = async (req, res) => {
    try {
        console.log("Updating SvenskaOrd with body:", req.body);
        const { _id, swedish, english, example } = req.body;
        
        if (!_id) {
            return res.status(400).json({ error: "ID is required" });
        }
        
        const updated = await SvenskaOrdModel.findByIdAndUpdate(
            _id,
            { swedish, english, example },
            { new: true }
        );
        
        if (!updated) {
            return res.status(404).json({ error: "SvenskaOrd not found" });
        }
        
        res.status(200).json(updated);
    } catch (error) {
        console.error('Error updating SvenskaOrd:', error);
        res.status(500).json({ error: 'Failed to update SvenskaOrd' });
    }
};

// 删除数据
exports.deleteSvenskaOrd = async (req, res) => {
    try {
        console.log("Deleting SvenskaOrd with body:", req.body);
        const { _id } = req.body;
        
        if (!_id) {
            return res.status(400).json({ error: "ID is required" });
        }
        
        const deleted = await SvenskaOrdModel.findByIdAndDelete(_id);
        
        if (!deleted) {
            return res.status(404).json({ error: "SvenskaOrd not found" });
        }
        
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error('Error deleting SvenskaOrd:', error);
        res.status(500).json({ error: 'Failed to delete SvenskaOrd' });
    }
};
