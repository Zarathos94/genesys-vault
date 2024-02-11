use anchor_lang::prelude::*;
use borsh::{BorshDeserialize, BorshSerialize};
use std::collections::BTreeMap;
extern crate serde_json;
declare_id!("5Hn8Uebjqn7xQC3wG4beY6nDy47WpwzJBd5LoN1N6nJA");

#[program]
pub mod genesysvault {

    use super::*;
    use std::convert::TryFrom;

    // handler function
    pub fn create_user_data(ctx: Context<CreateUserData>, key: String, data: String) -> Result<()> {
        let user_data = &mut ctx.accounts.user_data;
        if data.as_bytes().len() > 160 {
            // proper error handling omitted for brevity
            panic!();
        }
        let mut temp_data: BTreeMap<String, String> = BTreeMap::new();
        if !user_data.uinfo.is_empty() {
            let json_val = std::str::from_utf8(user_data.uinfo.as_slice())
                .unwrap()
                .to_string();
            temp_data = serde_json::from_str(&json_val).unwrap();
            if temp_data.contains_key(&key) {
                temp_data.remove(&key);
            }
        }
        temp_data.insert(key, data);
        user_data.bump = *ctx.bumps.get("user_data").unwrap();
        user_data.uinfo = serde_json::to_string(&temp_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }

    pub fn create_user_data_many(ctx: Context<CreateUserData>, input_data: Vec<u8>) -> Result<()> {
        let user_data = &mut ctx.accounts.user_data;
        if input_data.as_slice().len() > 512 {
            // proper error handling omitted for brevity
            panic!();
        }
        // Parse param
        let input_json_val = std::str::from_utf8(input_data.as_slice())
            .unwrap()
            .to_string();
        let input_map: BTreeMap<String, String> = serde_json::from_str(&input_json_val).unwrap();

        // Load existing data
        let mut existing_data: BTreeMap<String, String> = BTreeMap::new();
        if !user_data.uinfo.is_empty() {
            existing_data = serde_json::from_slice(&user_data.uinfo.as_slice()).unwrap();
        }
        // Map input data to existing data
        // Remove if there is conflict and override
        // Insert new data
        for x in input_map {
            if existing_data.contains_key(&x.0) {
                existing_data.remove(&x.0);
            }
            existing_data.insert(x.0, x.1);
        }
        user_data.bump = *ctx.bumps.get("user_data").unwrap();

        user_data.uinfo = serde_json::to_string(&existing_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }

    pub fn change_user_data_many(
        ctx: Context<ChangeUserDataMany>,
        input_data: Vec<u8>,
    ) -> Result<()> {
        let user_data = &mut ctx.accounts.user_data;
        if input_data.as_slice().len() > 512 {
            // proper error handling omitted for brevity
            panic!();
        }
        // Parse param
        let input_json_val = std::str::from_utf8(input_data.as_slice())
            .unwrap()
            .to_string();
        let input_map: BTreeMap<String, String> = serde_json::from_str(&input_json_val).unwrap();

        // Load existing data
        let mut existing_data: BTreeMap<String, String> = BTreeMap::new();
        if !user_data.uinfo.is_empty() {
            existing_data = serde_json::from_slice(&user_data.uinfo.as_slice()).unwrap();
        }
        // Map input data to existing data
        // Remove if there is conflict and override
        // Insert new data
        for x in input_map {
            if existing_data.contains_key(&x.0) {
                existing_data.remove(&x.0);
            }
            existing_data.insert(x.0, x.1);
        }
        //user_data.bump = *ctx.bumps.get("user_data").unwrap();

        user_data.uinfo = serde_json::to_string(&existing_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }

    // handler function
    pub fn change_user_data(ctx: Context<ChangeUserData>, key: String, data: String) -> Result<()> {
        if data.as_bytes().len() > 160 {
            // proper error handling omitted for brevity
            panic!();
        }
        let user_data = &mut ctx.accounts.user_data;

        if user_data.uinfo.is_empty() {
            panic!();
        }
        // Load existing data
        let mut existing_data: BTreeMap<String, String> =
            serde_json::from_slice(&user_data.uinfo.as_slice()).unwrap();

        // Check if key already exists, if yes remove the data
        if existing_data.contains_key(&key) {
            existing_data.remove(&key);
        }
        // Insert new data
        existing_data.insert(key, data);
        //user_data.bump = *ctx.bumps.get("user_data").unwrap();

        user_data.uinfo = serde_json::to_string(&existing_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }
    // handler function
    pub fn remove_user_data(ctx: Context<RemoveUserData>, key: String) -> Result<()> {
        let user_data = &mut ctx.accounts.user_data;
        let mut existing_data: BTreeMap<String, String> = BTreeMap::new();
        if !user_data.uinfo.is_empty() {
            existing_data = serde_json::from_slice(&user_data.uinfo.as_slice()).unwrap();
        }
        // Check if key already exists, if yes remove the data
        if existing_data.contains_key(&key) {
            existing_data.remove(&key);
        }
        // user_data.bump = *ctx.bumps.get("user_data").unwrap();

        user_data.uinfo = serde_json::to_string(&existing_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }
    // handler function
    pub fn clear_user_data(ctx: Context<ClearUserData>) -> Result<()> {
        let user_data = &mut ctx.accounts.user_data;
        let existing_data: BTreeMap<String, String> = BTreeMap::new();
        // user_data.bump = *ctx.bumps.get("user_data").unwrap();

        user_data.uinfo = serde_json::to_string(&existing_data).unwrap().into_bytes();
        user_data.data_length = u32::try_from(user_data.uinfo.len()).unwrap_or(3);
        Ok(())
    }
}

#[account]
pub struct UserData {
    uinfo: Vec<u8>,
    data_length: u32,
    bump: u8,
}

// validation struct
#[derive(Accounts)]
pub struct CreateUserData<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space: 8 discriminator + 16 info length + 512 info + 1 bump
    #[account(
    init,
    payer = user,
    space = 8 + 16 + 512 + 1, seeds = [b"user-data", user.key().as_ref()], bump
    )]
    pub user_data: Account<'info, UserData>,
    pub system_program: Program<'info, System>,
}

// validation struct
#[derive(Accounts)]
pub struct ChangeUserData<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-data", user.key().as_ref()], bump = user_data.bump)]
    pub user_data: Account<'info, UserData>,
}

// validation struct
#[derive(Accounts)]
pub struct ChangeUserDataMany<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-data", user.key().as_ref()], bump = user_data.bump)]
    pub user_data: Account<'info, UserData>,
}

// validation struct
#[derive(Accounts)]
pub struct ClearUserData<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-data", user.key().as_ref()], bump = user_data.bump)]
    pub user_data: Account<'info, UserData>,
}

// validation struct
#[derive(Accounts)]
pub struct RemoveUserData<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds = [b"user-data", user.key().as_ref()], bump = user_data.bump)]
    pub user_data: Account<'info, UserData>,
}

// validation struct
#[derive(Accounts)]
pub struct CreateUserDataMany<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space: 8 discriminator + 16 info length + 512 info + 1 bump
    #[account(
    init,
    payer = user,
    space = 8 + 16 + 512 + 1, seeds = [b"user-data", user.key().as_ref()], bump
    )]
    pub user_data: Account<'info, UserData>,
    pub system_program: Program<'info, System>,
}
