export function verifyCartList() {
  if (!localStorage.getItem('cartList')) {
    localStorage.setItem('cartList', JSON.stringify([]));
  }
  if (!localStorage.getItem('cartSize')) {
    localStorage.setItem('cartSize', JSON.stringify(0));
  }
}

export function getCartSize() {
  verifyCartList();
  const cartList = JSON.parse(localStorage.getItem('cartList'));
  const cartSize = cartList.reduce((acc, item) => acc + item.count, 0);
  localStorage.setItem('cartSize', JSON.stringify(cartSize));
  const cartSizeLocalS = JSON.parse(localStorage.getItem('cartSize'));
  return cartSizeLocalS;
//   this.setState({
//     cartSize: cartSizeLocalS,
//   });
}
