import jwt from 'jsonwebtoken';

export const makeJWTToken = (tokenData, res) => {
  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

  res.cookie(process.env.USER_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return token
}

// We used this for formatting error that comes from zod validation
export const formatFieldName = (fieldName) => {
  return fieldName
    // Add space before capital letters for camel case words and capitalize it at first letter to be more readable for human
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (str) => str.toUpperCase());
};