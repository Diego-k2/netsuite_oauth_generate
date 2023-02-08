import getAuthorization from "./index.js";

const getConfig = {
    realm_netsuite: "seu_realm",
    clientid_netsuite: "sua_consumer_key",
    clientsecret_netsuite: "sua_consumer_secret",
    tokenid_netsuite: "sua_acess_token",
    tokensecret_netsuite: "sua_token_secret",
    url: "sua_url_restlet_completa"
}

// Usado para verificar a saida.
console.log(getAuthorization(getConfig));