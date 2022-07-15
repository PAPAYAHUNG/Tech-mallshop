import Commerce from '@chec/commerce.js';
const checAPIKey = process.env.REACT_APP_CHEC_PUBLIC_KEY;
// export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY,true);
export const commerce = new Commerce("pk_test_449883078f645e9f34cebbf6848a33fe51eef140f461f",true);