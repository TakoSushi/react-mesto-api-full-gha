// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Некоректный id' });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с данной почтой уже зарегестрирован' });
  }

  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере поизошла ошибка'
        : message,
    });
};
