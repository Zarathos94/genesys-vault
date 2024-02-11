import { Program, utils, AnchorProvider, Address } from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
declare let window: any;
import IDLJSON from './crypto-vault.json';
import { Crypter } from './utils/crypter';

export class CryptoVaultService {
  network = "http://127.0.0.1:8899";
  connection!: Connection;
  wallet: any;
  account?: string;

  subscriptions: Map<string, ((event: any) => void) | null>;

  constructor() {
    this.subscriptions = new Map<string, ((event: any) => void) | null>();
  }

  /**
   * Create a network and wallet context provider
   * @return {void}
  */
  getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        this.wallet = provider;
        return provider
      }
    }
    throw new Error("Could not load provider");
  };
  /**
   * Initialize the wallet provider
   * @return {Promise<any>} - Wallet provider
   */
  async init(): Promise<any> {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        this.wallet = provider;
        this.wallet.on("connect", () => (this.account = this.wallet.publicKey.toString()));
        this.wallet.on("disconnect", () => (this.account = ""));
        return await provider.connect();
      } else {
        // alert("Please install a Solana wallet provider");
        throw new Error("Wallet provider not found!");
      }
    } else {
      // alert("Please install a Solana wallet provider");
      throw new Error("Wallet provider not found!");
    }

  }
  /**
   * Connect to the network
   * @return {Promise<string>} - Provider wallet public key
   */
  async connect(): Promise<string> {
    try {
      this.connection = new Connection(this.network, "confirmed");
      return this.getProvider().wallet.publicKey.toString();
    } catch (e: any) {
      throw new Error("Could not fetch account from provider. Reason: " + e.message);
    }
  }
  /**
   * Get balance of the account from the provider
   * @return {Promise<string>} - Balance of the account in lamports
   */
  async getBalance(): Promise<string> {
    try {
      const provider = this.getProvider();
      const amount = await provider.connection.getBalance(this.wallet.publicKey);
      return String(amount);
    } catch (e: any) {
      throw new Error("Could not fetch balance for account. Reason: " + e.message);
    }
  }
  /**
   * Get the public key of the account from the provider
   * @return {Promise<string>} - Public key of the account
   */
  async getPublicKey(): Promise<string> {
    return this.wallet.publicKey.toString()
  }

  /**
   * Check if the user data account exists
  
   * @param {string} programId - Program id of the deployed program
   * @return {Promise<boolean>} - True if the account exists, false otherwise
   */
  async checkIfUserDataExists(programId: string): Promise<boolean> {
    try {
      this.connection = new Connection(this.network, "confirmed");
      const p = new AnchorProvider(this.connection, this.wallet, {});
      const a = JSON.stringify(IDLJSON)
      const b = JSON.parse(a)
      const program = new Program(b, programId as Address, p);

      const [userDataPDA, _] = await PublicKey
        .findProgramAddress(
          [
            utils.bytes.utf8.encode("user-data"),
            this.wallet.publicKey.toBuffer()
          ],
          program.programId
        );
      await program.account.userData.fetch(userDataPDA);
    } catch (e: any) {
      return false;
    }
    return true;
  }

  /**
  * Get deployed program with the given program id
  * @param {string} programId - Program id of the deployed program
  * @return {Promise<string>} - Program object
  */
  async getProgram(programId: string): Promise<Program> {
    try {
      this.connection = new Connection(this.network, "confirmed");
      const p = new AnchorProvider(this.connection, this.wallet, {});
      const a = JSON.stringify(IDLJSON)
      const b = JSON.parse(a)
      return new Program(b, programId as Address, p);
    } catch(e: any) {
      throw new Error("Could not load program IDL. Reason: " + e.message);
    }
  }

  /**
  * Get user data account from the provider
  * @param {string} programId - Program id of the deployed program
  * @return {Promise<string>} - User data account
  */
  async getUserDataPDA(programId: string): Promise<string> {
    const program = await this.getProgram(programId);
    const [userDataPDA, _] = await PublicKey
      .findProgramAddress(
        [
          utils.bytes.utf8.encode("user-data"),
          this.wallet.publicKey.toBuffer()
        ],
        program.programId
      );
    return userDataPDA.toString();
  }

  /**
   * Create user data account if it does not exist
   * @param {string} programId - Program id of the deployed program
   * @return {Promise<string>} - Transaction id
   */
  async createUserDataWithObject(programId: string, data: Object): Promise<string> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);

      let encryptedData = {};
      for (let k in data) {
        const pKey = await this.getPublicKey();
        const signedMessage = await this.singMessage(pKey);
        encryptedData[k] = Crypter.encrypt(String(signedMessage['signature']), data[k]);
      }

      const tx = await program.methods['createUserDataMany'](Buffer.from(JSON.stringify(encryptedData)))
        .accounts({
          user: this.wallet.publicKey,
          userData: userDataPDA,
        })
        .rpc();
      return tx;
    } catch (e: any) {
      throw new Error("Could not create user data. Reason: " + e.message);
    }
  }

  /**
   * Update user data account with new data
   * @param {string} programId - Program id of the deployed program
   * @return {Promise<string>} - Transaction id
   */
  async updateUserDataWithObject(programId: string, data: Object): Promise<string> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);

      let encryptedData = {};
      for (let k in data) {
        const pKey = await this.getPublicKey();
        const signedMessage = await this.singMessage(pKey);
        encryptedData[k] = Crypter.encrypt(String(signedMessage['signature']), data[k]);
      }
      const tx = await program.methods['changeUserDataMany'](Buffer.from(JSON.stringify(encryptedData)))
        .accounts({
          user: this.wallet.publicKey,
          userData: userDataPDA,
        })
        .rpc();
      return tx;
    } catch (e: any) {
      throw new Error("Could not update user data. Reason: " + e.message);
    }
  }
  /**
   * Update user data account with a single key-value pair
   * @param {string} programId - Program id of the deployed program
   * @param {string} key - Key of the data to update
   * @param {string} value - Value of the data to update
   * @return {Promise<string>} - Transaction id
   */
  async updateUserDataWithKV(programId: string, key: string, value: string): Promise<string> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);

      const pKey = await this.getPublicKey();
      const signedMessage = await this.singMessage(pKey);
      const encryptedData = Crypter.encrypt(String(signedMessage['signature']), value);

      const tx = await program.methods['changeUserData']([key, encryptedData])
        .accounts({
          user: this.wallet.publicKey,
          userData: userDataPDA,
        })
        .rpc();
      return tx;
    } catch (e: any) {
      throw new Error("Could not update user data. Reason: " + e.message);
    }
  }
  /**
   * Create user data account if it does not exist
   * @param {string} programId - Program id of the deployed program
   * @param {string} key - Key of the data to create
   * @param {string} value - Value of the data to create
   * @return {Promise<string>} - Transaction id
   */
  async createUserDataWithKV(programId: string, key: string, value: string): Promise<string> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);

      const pKey = await this.getPublicKey();
      const signedMessage = await this.singMessage(pKey);
      const encryptedData = Crypter.encrypt(String(signedMessage['signature']), value);

      const tx = await program.methods['createUserData']([key, encryptedData])
        .accounts({
          user: this.wallet.publicKey,
          userData: userDataPDA,
        })
        .rpc();
      return tx;
    } catch (e: any) {
      throw new Error("Could not create user data. Reason: " + e.message);
    }
  }

  /**
   * Remove data from the user data account with the given key
   * @param {string} programId - Program id of the deployed program
   * @param {string} key - Key of the data to remove
   * @return {Promise<string>} - Transaction id
   */
   async removeUserDataWithKey(programId: string, key: string): Promise<string> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);

      const tx = await program.methods['removeUserData'](key)
        .accounts({
          user: this.wallet.publicKey,
          userData: userDataPDA,
        })
        .rpc();
      return tx;
    } catch (e: any) {
      throw new Error("Could not remove user data. Reason: " + e.message);
    }
  }

   /**
   * Clear all data from the user data account
   * @param {string} programId - Program id of the deployed program
   * @return {Promise<string>} - Transaction id
   */
    async clearUserData(programId: string): Promise<string> {
      try {
        const program = await this.getProgram(programId);
        const userDataPDA = await this.getUserDataPDA(programId);
  
        const tx = await program.methods['clearUserData']()
          .accounts({
            user: this.wallet.publicKey,
            userData: userDataPDA,
          })
          .rpc();
        return tx;
      } catch (e: any) {
        throw new Error("Could not clear user data. Reason: " + e.message);
      }
    }

  /**
  * Get user data account from the provider with the given program id
  * @param {string} programId - Program id of the deployed program
  * @return {Promise<Object>} - User data account as an object
  */
  async getUserData(programId: string): Promise<Object> {
    try {
      const program = await this.getProgram(programId);
      const userDataPDA = await this.getUserDataPDA(programId);
      const data = JSON.parse(String((await program.account["userData"].fetch(userDataPDA)).uinfo));
      let decryptedData = {};
      for (let k in data) {
        const pKey = await this.getPublicKey();
        const signedMessage = await this.singMessage(pKey);
        decryptedData[k] = Crypter.decrypt(String(signedMessage['signature']), data[k]);
      }
      return decryptedData;

    } catch (e: any) {
      throw new Error("Could not fetch user data. Reason: " + e.message);
    }
  }
    /**
  * Get user data account from the provider with the given program id and key
  * @param {string} programId - Program id of the deployed program
  * @param {string} key - Key of the data to fetch
  * @return {Promise<string>} - Value of the data 
  */
     async getUserDataWithKey(programId: string, key: string): Promise<string> {
      try {
        const program = await this.getProgram(programId);
        const userDataPDA = await this.getUserDataPDA(programId);
        const data = JSON.parse(String((await program.account["userData"].fetch(userDataPDA)).uinfo));
        const pKey = await this.getPublicKey();
        const signedMessage = await this.singMessage(pKey);
        const decryptedData = Crypter.decrypt(String(signedMessage['signature']), data[key]);
        return decryptedData;
      } catch (e: any) {
        throw new Error("Could not fetch user data. Reason: " + e.message);
      }
    }
  /**
  *  Sign a message with the private key of the user
  * @param {string} message - Message to sign
  * @return {Promise<string>} - Signed message
  */
  async singMessage(message: string): Promise<string> {
    try {
      const provider = this.getProvider();
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8"); // sign the message
      return signedMessage;
    } catch (e: any) {
      throw new Error("Could not sign message. Reason: " + e.message);
    }
  }
}
