export const API_ENDPOINTS = {
    USER: {
      GET_ALL: 'user-list',
      ADD_USER:"addUser",
      EDIT_USER_BY_ID:(id: number) => `editDetails/${id}`,
      CREATE: '/api/users',
      DELETE: (id: number) => `delete/${id}`
    },
    PRODUCT: {
      GET_ALL: 'products',
      ADD_PRODUCT : "addproducts",
     CREATE: '/api/products',
      UPDATE: (id: number) => `/api/products/${id}`,
      DELETE: (id: number) => `/api/products/${id}`
    },
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH_TOKEN: '/api/auth/refresh'
    },
    CATEGORY:{
      GET_ALL_CATEGORY: "category",
      ADD_CATEGORY : "addCategory",
      DELETE_CATEGORY : (id: number) =>`deleteCategory/${id}`
    }
  };
  