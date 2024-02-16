import {
    postPedidoURL,
    getPedidoURL,postPedidoTieneCarneURL} from "../crudPedido/urlsPedido.js"
  
  async function postPedido(pedido) {
    try {
      const response = await axios.post(postPedidoURL, pedido);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getPedido(pedido) {
    try {
      const response = await axios.get(getPedidoURL);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postPedidoTieneCarne(pedido) {
    try {
      const response = await axios.post(postPedidoTieneCarneURL, pedido);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  export {postPedido, getPedido,postPedidoTieneCarne}