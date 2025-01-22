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

export const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Menambahkan spasi sebelum huruf kapital
    .replace(/^./, (str) => str.toUpperCase()); // Mengubah huruf pertama menjadi kapital
};