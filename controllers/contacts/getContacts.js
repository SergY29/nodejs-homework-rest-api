const { getListContacts } = require('../../service/contacts')



const getContacts = async (req, res, next) => {
    const { _id } = req.user
    // console.log(req.user)
    const { page = 1, limit = 5, favorite = [true, false] } = req.query;
    const skip = (page - 1) * limit;

    const data = await getListContacts(_id, favorite, skip, limit);
    res.json({
        status: 'success',
        code: 200,
        data,
    })
};

module.exports = getContacts