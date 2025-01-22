import { ZodError } from 'zod';
import { formatFieldName } from '../lib/utils.js';

const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => {
          const fieldName = issue.path.join('.');
          const formattedFieldName = formatFieldName(fieldName);
          return `${formattedFieldName} is ${issue.message}`;
        });
        return res.status(400).json({
          success: false,
          message: 'Invalid data',
          errorMessages: errorMessages
        });
      } else {
        console.log('Error in validateUserSignUp middleware', error.message);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        })
      }
    }
  }
}

export default validateData