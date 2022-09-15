export function getLoggedInUserToken() {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  const userObject = JSON.parse(window.atob(token.split('.')[1]));
  console.log(userObject.sub);
  return userObject.sub;
}
