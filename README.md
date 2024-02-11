# Genesys Vault

### Library documentation
- [Genesys Vault](projects/crypto-vault/README.md)

There are a few things that we need to get up and running. Before we move forward make sure you've a working NodeJS environment set up. We need Rust, Solana, Mocha(a JS testing framework), Anchor and Phantom wallet installed and properly set up. To install rust, run

```shell
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
    rustup component add rustfmt
```

To install Solana, run:

```shell
    sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

To install Anchor, we will be using avm (anchor version manager).

To install avm run:

```shell
    cargo install --git https://github.com/project-serum/anchor avm --locked --force
```

After the installation is complete, run:

```shell
    avm install latest
    avm use latest
```

After all of these are done, you can run the following:

```shell
    yarn install
```

And navigate into the `projects/contract` directory and run:

Open another terminal and run:

```shell
    solana-test-validator
```

Go back to the previous terminal:

```shell
    solana airdrop 100 megsPPhXkzwW4YAu2vNRMwnNencVL7UcQ2UMqU5cmur
```

```shell
    cargo clean
```

```shell
    anchor build
```

```shell
    anchor deploy
```

After the deploy, you need to update the given Program Id as `declare_id!` in the [`lib.rs`](projects/contract/programs/genesysvault/src/lib.rs) file. Also, you need to update the `genesysvault` field in the [`Anchor.toml`](projects/contract/Anchor.toml) file.

```shell
    anchor test
```

Navigate into the `projects/crypto-vault` directory and run:

```shell
    yarn install
```
