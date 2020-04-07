import { IAddress } from "../address/types";
/**
 * Data types
 */

export interface IRecipient {
  id: number;
  name: string;
  address_id: number;
  address: IAddress;
}
