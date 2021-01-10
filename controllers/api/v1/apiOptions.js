exports.apiurl = async () => {
  require('dotenv').config();
  const { API_BASE } = process.env;

  return (process.env.NODE_ENV === 'production') ? API_BASE : 'http://localhost:2020';
};
