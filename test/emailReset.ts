import Apis, { SatuSehatState, Server } from "../src";

(async () => {

   const cpanel = new Server.Cpanel({
       server : {
           host : "https://omi.co.id",
           port : 2083
       },
       credentials : {
           username : "omis5747",
           password : "05MO8CSRGP8AUBXWUNFQ7D2NFEL1CVSV"
       }
   });

   cpanel
       .Module()
       .Email()
       .ResetPassword({
           email : "dika@omi.co.id",
           password : "@Malang1997Indonesia"
       }).then((responces) => {
           console.log(responces)
       }).catch((error) => {
           console.error(error)
       })


})();