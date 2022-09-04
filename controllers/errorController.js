import { AppError } from '../utils/helper.js';

const sendErrorDev = (req, res, err) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      error: err,
      message: err.message || '',
      stack: err.stack,
    });
  }
};

const sendErrorProd = (req, res, err) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message || '',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value : /'${err.keyValue.name}'/. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errorList = Object.values(err.errors).map((e) => e.message);
  console.log(errorList);
  const message = errorList.join(', ');
  return new AppError(message, 400);
};

const handleInvalidInput = (err) => {
  const message = 'Please Enter a valid Input';
  return new AppError(message, 400);
};

export default (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') sendErrorDev(req, res, err);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (err.statusCode === 400) {
      error = handleInvalidInput(error);
    } else if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    sendErrorProd(req, res, error);
  }
};
