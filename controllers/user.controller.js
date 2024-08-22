const { errorHandler } = require('../helpers/error_handler');
const User = require('../schemas/user'); // To'g'ri yo'lni ko'rsating
const { authorValidation } = require('../validations/user.validation');

const addUser = async (req, res) => {
    try {
        // Validatsiya qo'shish
        const { error } = authorValidation(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const {
            user_name,
            user_email,
            user_password,
            user_info,
            user_photo,
            user_is_active
        } = req.body;

        const newUser = await User.create({
            user_name,
            user_email,
            user_password,
            user_info,
            user_photo,
            user_is_active
        });

        res.status(201).send({ message: "Yangi foydalanuvchi qo'shildi", newUser });
    } catch (error) {
        errorHandler(res, error);
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
        res.send(user);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        updates.updated_date = Date.now();

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) return res.status(404).send({ message: "Foydalanuvchi topilmadi" });

        res.send({ message: "Foydalanuvchi yangilandi", updatedUser });
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).send({ message: "Foydalanuvchi topilmadi" });

        res.send({ message: "Foydalanuvchi o'chirildi" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
