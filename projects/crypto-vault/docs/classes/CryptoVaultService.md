[genesys-vault](../README.md) / [Exports](../modules.md) / CryptoVaultService

# Class: CryptoVaultService

## Table of contents

### Constructors

- [constructor](CryptoVaultService.md#constructor)

### Properties

- [account](CryptoVaultService.md#account)
- [connection](CryptoVaultService.md#connection)
- [network](CryptoVaultService.md#network)
- [subscriptions](CryptoVaultService.md#subscriptions)
- [wallet](CryptoVaultService.md#wallet)

### Methods

- [checkIfUserDataExists](CryptoVaultService.md#checkifuserdataexists)
- [clearUserData](CryptoVaultService.md#clearuserdata)
- [connect](CryptoVaultService.md#connect)
- [createUserDataWithKV](CryptoVaultService.md#createuserdatawithkv)
- [createUserDataWithObject](CryptoVaultService.md#createuserdatawithobject)
- [getBalance](CryptoVaultService.md#getbalance)
- [getProgram](CryptoVaultService.md#getprogram)
- [getProvider](CryptoVaultService.md#getprovider)
- [getPublicKey](CryptoVaultService.md#getpublickey)
- [getUserData](CryptoVaultService.md#getuserdata)
- [getUserDataPDA](CryptoVaultService.md#getuserdatapda)
- [getUserDataWithKey](CryptoVaultService.md#getuserdatawithkey)
- [init](CryptoVaultService.md#init)
- [removeUserDataWithKey](CryptoVaultService.md#removeuserdatawithkey)
- [singMessage](CryptoVaultService.md#singmessage)
- [updateUserDataWithKV](CryptoVaultService.md#updateuserdatawithkv)
- [updateUserDataWithObject](CryptoVaultService.md#updateuserdatawithobject)

## Constructors

### constructor

• **new CryptoVaultService**()

#### Defined in

[crypto-vault.service.ts:16](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L16)

## Properties

### account

• `Optional` **account**: `string`

#### Defined in

[crypto-vault.service.ts:12](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L12)

___

### connection

• **connection**: `Connection`

#### Defined in

[crypto-vault.service.ts:10](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L10)

___

### network

• **network**: `string` = `"http://127.0.0.1:8899"`

#### Defined in

[crypto-vault.service.ts:9](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L9)

___

### subscriptions

• **subscriptions**: `Map`<`string`, ``null`` \| (`event`: `any`) => `void`\>

#### Defined in

[crypto-vault.service.ts:14](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L14)

___

### wallet

• **wallet**: `any`

#### Defined in

[crypto-vault.service.ts:11](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L11)

## Methods

### checkIfUserDataExists

▸ **checkIfUserDataExists**(`programId`): `Promise`<`boolean`\>

Check if the user data account exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |

#### Returns

`Promise`<`boolean`\>

- True if the account exists, false otherwise

#### Defined in

[crypto-vault.service.ts:100](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L100)

___

### clearUserData

▸ **clearUserData**(`programId`): `Promise`<`string`\>

Clear all data from the user data account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:293](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L293)

___

### connect

▸ **connect**(): `Promise`<`string`\>

Connect to the network

#### Returns

`Promise`<`string`\>

- Provider wallet public key

#### Defined in

[crypto-vault.service.ts:65](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L65)

___

### createUserDataWithKV

▸ **createUserDataWithKV**(`programId`, `key`, `value`): `Promise`<`string`\>

Create user data account if it does not exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `key` | `string` | Key of the data to create |
| `value` | `string` | Value of the data to create |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:244](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L244)

___

### createUserDataWithObject

▸ **createUserDataWithObject**(`programId`, `data`): `Promise`<`string`\>

Create user data account if it does not exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `data` | `Object` | - |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:159](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L159)

___

### getBalance

▸ **getBalance**(): `Promise`<`string`\>

Get balance of the account from the provider

#### Returns

`Promise`<`string`\>

- Balance of the account in lamports

#### Defined in

[crypto-vault.service.ts:77](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L77)

___

### getProgram

▸ **getProgram**(`programId`): `Promise`<`Program`<`Idl`\>\>

Get deployed program with the given program id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |

#### Returns

`Promise`<`Program`<`Idl`\>\>

- Program object

#### Defined in

[crypto-vault.service.ts:128](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L128)

___

### getProvider

▸ **getProvider**(): `any`

Create a network and wallet context provider

#### Returns

`any`

#### Defined in

[crypto-vault.service.ts:24](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L24)

___

### getPublicKey

▸ **getPublicKey**(): `Promise`<`string`\>

Get the public key of the account from the provider

#### Returns

`Promise`<`string`\>

- Public key of the account

#### Defined in

[crypto-vault.service.ts:90](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L90)

___

### getUserData

▸ **getUserData**(`programId`): `Promise`<`Object`\>

Get user data account from the provider with the given program id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |

#### Returns

`Promise`<`Object`\>

- User data account as an object

#### Defined in

[crypto-vault.service.ts:315](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L315)

___

### getUserDataPDA

▸ **getUserDataPDA**(`programId`): `Promise`<`string`\>

Get user data account from the provider

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |

#### Returns

`Promise`<`string`\>

- User data account

#### Defined in

[crypto-vault.service.ts:141](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L141)

___

### getUserDataWithKey

▸ **getUserDataWithKey**(`programId`, `key`): `Promise`<`string`\>

Get user data account from the provider with the given program id and key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `key` | `string` | Key of the data to fetch |

#### Returns

`Promise`<`string`\>

- Value of the data

#### Defined in

[crypto-vault.service.ts:338](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L338)

___

### init

▸ **init**(): `Promise`<`any`\>

Initialize the wallet provider

#### Returns

`Promise`<`any`\>

- Wallet provider

#### Defined in

[crypto-vault.service.ts:42](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L42)

___

### removeUserDataWithKey

▸ **removeUserDataWithKey**(`programId`, `key`): `Promise`<`string`\>

Remove data from the user data account with the given key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `key` | `string` | Key of the data to remove |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:271](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L271)

___

### singMessage

▸ **singMessage**(`message`): `Promise`<`string`\>

Sign a message with the private key of the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message to sign |

#### Returns

`Promise`<`string`\>

- Signed message

#### Defined in

[crypto-vault.service.ts:356](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L356)

___

### updateUserDataWithKV

▸ **updateUserDataWithKV**(`programId`, `key`, `value`): `Promise`<`string`\>

Update user data account with a single key-value pair

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `key` | `string` | Key of the data to update |
| `value` | `string` | Value of the data to update |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:217](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L217)

___

### updateUserDataWithObject

▸ **updateUserDataWithObject**(`programId`, `data`): `Promise`<`string`\>

Update user data account with new data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `programId` | `string` | Program id of the deployed program |
| `data` | `Object` | - |

#### Returns

`Promise`<`string`\>

- Transaction id

#### Defined in

[crypto-vault.service.ts:188](https://github.com/Zarathos94/genesys-vault/blob/8a540f3/projects/crypto-vault/src/crypto-vault.service.ts#L188)
