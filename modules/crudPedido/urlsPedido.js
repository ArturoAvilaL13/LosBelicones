//~URL base para la api
import { baseURL } from "../urlBase.js";

const postPedidoURL = `${baseURL}pedido`;

const getPedidoURL = `${baseURL}pedidos`;

const postPedidoTieneCarneURL = `${baseURL}pedidoCarne`


export { postPedidoURL, getPedidoURL,postPedidoTieneCarneURL };
