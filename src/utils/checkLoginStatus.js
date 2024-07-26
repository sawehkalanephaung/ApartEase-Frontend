import store from '@/stores';
import router from '@/router';

export const checkLoginStatus = () => {
  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('loginExpiration');

  if (token && expirationTime) {
    if (new Date().getTime() > parseInt(expirationTime)) {
      // Login expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('loginExpiration');
      store.commit('setUser', null);
      store.commit('setJwtToken', null);
      store.commit('setRole', null);
      router.push('/login');
    }
  }
};
