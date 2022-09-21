export function getLoggedInUserToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  return userObject.sub;
}
