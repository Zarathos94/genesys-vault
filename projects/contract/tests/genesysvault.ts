import { Genesysvault } from '../target/types/genesysvault';
import * as anchor from "@project-serum/anchor";
import {Program, AnchorProvider} from "@project-serum/anchor";
import {PublicKey} from '@solana/web3.js';
import {expect} from 'chai';

describe("genesysvault", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(AnchorProvider.env());
    const provider = AnchorProvider.env();

    const program = anchor.workspace.Genesysvault as Program<Genesysvault>;

    it("Confirm account doesn't exists", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        try {
            await program.account.userData.fetch(userDataPDA);
        } catch (e) {
            expect(e.toString()).to.contains("Account does not exist");
        }
    });
    it("Create user data", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        await program.methods
            .createUserDataMany(Buffer.from(JSON.stringify({'test1': '1', 'test2': '2', 'test3': '3'})))
            .accounts({
                user: provider.wallet.publicKey,
                userData: userDataPDA
            })
            .rpc();
        let storedData = await program.account.userData.fetch(userDataPDA);
        let parsedData = JSON.parse(String(storedData.uinfo));
        expect(parsedData['test1']).to.equal('1');
        expect(parsedData['test2']).to.equal('2');
        expect(parsedData['test3']).to.equal('3');
    });
    it("Check if account exists", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        const acc = await program.account.userData.fetch(userDataPDA);
        expect(acc.dataLength).to.greaterThan(1);
    });
    it("Try recreating existing account", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        try {
            await program.methods
                .createUserDataMany(Buffer.from(JSON.stringify({'1': '1'})))
                .accounts({
                    user: provider.wallet.publicKey,
                    userData: userDataPDA
                })
                .rpc();
        } catch (e) {
            expect(e.toString()).to.contains("Error: failed to send transaction");
        }
    });
    it("Change user data multiple", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        await program.methods
            .changeUserDataMany(Buffer.from(JSON.stringify({'test1': '11', 'test2': '22', 'test3': '33'})))
            .accounts({
                user: provider.wallet.publicKey,
                userData: userDataPDA
            })
            .rpc();
        let storedData = await program.account.userData.fetch(userDataPDA);
        let parsedData = JSON.parse(String(storedData.uinfo));
        expect(parsedData['test1']).to.equal('11');
        expect(parsedData['test2']).to.equal('22');
        expect(parsedData['test3']).to.equal('33');
    })

    it("Change user data single", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        await program.methods
            .changeUserData("test55", "55")
            .accounts({
                user: provider.wallet.publicKey,
                userData: userDataPDA
            })
            .rpc();
        let storedData = await program.account.userData.fetch(userDataPDA);
        let parsedData = JSON.parse(String(storedData.uinfo));
        expect(parsedData['test55']).to.equal('55');
        expect(parsedData['test2']).to.equal('22');
        expect(parsedData['test3']).to.equal('33');
    })

    it("Remove user data single", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        await program.methods
            .removeUserData("test2")
            .accounts({
                user: provider.wallet.publicKey,
                userData: userDataPDA
            })
            .rpc();
        let storedData = await program.account.userData.fetch(userDataPDA);
        let parsedData = JSON.parse(String(storedData.uinfo));
        expect(parsedData['test55']).to.equal('55');
        expect(parsedData["test2"]).to.equal(undefined);
        expect(parsedData['test3']).to.equal('33');
    })

    it("Clear user data", async() => {
        const [userDataPDA, _] = await PublicKey
            .findProgramAddress(
                [
                    anchor.utils.bytes.utf8.encode("user-data"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );
        await program.methods
            .clearUserData()
            .accounts({
                user: provider.wallet.publicKey,
                userData: userDataPDA
            })
            .rpc();
        let storedData = await program.account.userData.fetch(userDataPDA);
        let parsedData = JSON.parse(String(storedData.uinfo));
        expect(JSON.stringify(parsedData)).to.equal("{}");
    })
});
