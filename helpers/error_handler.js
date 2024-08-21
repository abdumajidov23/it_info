const errorHandler = (res, error) => {
    console.error(error); // Xatoni konsolda chop etadi (loglash)
    
    // Xatolik turi va xabarini tekshirib, mos keluvchi javobni qaytarish
    if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Ma\'lumotlar to\'g\'ri emas', error: error.message });
    } else if (error.name === 'MongoError' && error.code === 11000) {
        res.status(409).send({ message: 'Bu ma\'lumot allaqachon mavjud', error: error.message });
    } else {
        res.status(500).send({ message: 'Serverda xatolik yuz berdi', error: error.message });
    }
};

module.exports = { errorHandler };
