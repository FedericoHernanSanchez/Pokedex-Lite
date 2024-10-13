import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');  

  if (userId) {
    return true;  
  } else {
    const router = new Router();  
    router.navigate(['login']);  
    return false; 
  }
  
};
