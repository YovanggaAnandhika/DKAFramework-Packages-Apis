import Payment from './Payment';
import Health from './Health';
import Server from "./Server";
export { SatuSehatConfigConstructorState as SatuSehatState } from './Health/SatuSehat/Types/SatuSehatConfigConstructor';

const Apis = {
  Payment: Payment,
  Health: Health,
  Server : Server
};

export { Payment, Health, Server };
export default Apis;
