import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
import SignUp from "./SignUp";
import useAccount from "../hooks/useAccount";

import styles from "../styles/MainView.module.css";
import { useState } from "react";

let isAccount = false;

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { BN, web3 } = anchor;
const { SystemProgram } = web3;

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
};

const MainView = () => {
  const [isAccount, setIsAccount] = useState(false);

  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const program = getProgramInstance(connection, wallet);

  const { signup } = useAccount();

  return (
    <>
      {isAccount ? (
        <div>Tik toks will go here</div>
      ) : (
        <SignUp signup={signup} wallet={wallet.publicKey.toBase58()} />
      )}
    </>
  );
};

export default MainView;
