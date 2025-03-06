const { Router } = require('express');
const router = Router();

// 导入控制器函数
const { getSvenskaOrd, saveSvenskaOrd, updateSvenskaOrd, deleteSvenskaOrd } = require('../controllers/SvenskaOrdController');

// 根路由 - 测试用
router.get('/', (req, res) => {
    res.json({ message: 'Hi there...' });
});

// 获取所有数据的路由
router.get('/getSvenskaOrd', getSvenskaOrd);  // 确保 getSvenskaOrd 函数已定义

// 保存新数据的路由
router.post('/save', saveSvenskaOrd);  // 确保 saveSvenskaOrd 函数已定义

// 更新数据的路由
router.post('/update', updateSvenskaOrd);  // 确保 updateSvenskaOrd 函数已定义

// 删除数据的路由
router.post('/delete', deleteSvenskaOrd);  // 确保 deleteSvenskaOrd 函数已定义

module.exports = router;
