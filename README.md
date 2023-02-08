
# Gerador de OAuth1.0 para Netsuite RestLet

Esta lib é um gerador de header no padrão exigido no Netsuite RestLet. Para fazer integrações utilizando o Node.JS.
## Uso/Exemplos
```Javascript 
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

//Saida retornada
{
  code: 200,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'OAuth realm="seu_realm",oauth_consumer_key="sua_consumer_key",oauth_token="sua_Aces_token",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1675861545",oauth_nonce="nonce_gerado",oauth_version="1.0",oauth_signature="signature_gerada"'
  }

``` 
Após feito isso basta você utilizar esse atributo Authorization em 
um Fetch ou outro metodo de sua escolha.