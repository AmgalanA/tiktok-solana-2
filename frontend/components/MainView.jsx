import { useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import UploadModal from "./UploadModal";
import Video from "./Video";
import BottomBar from "./BottomBar";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
import SignUp from "./SignUp";
import useAccount from "../hooks/useAccount";
import useTikTok from "../hooks/useTikTok";

import styles from "../styles/MainView.module.css";
import { useState, useEffect } from "react";

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
  const [newVideoShow, setNewVideoShow] = useState(false);
  const [tiktoks, setTikToks] = useState([]);
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [userDetail, setUserDetail] = useState();

  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const program = getProgramInstance(connection, wallet);

  const { signup } = useAccount();

  const { getTikToks, likeVideo, createComment, newVideo, getComments } =
    useTikTok(
      setTikToks,
      userDetail,
      videoUrl,
      description,
      setVideoUrl,
      setNewVideoShow
    );

  useEffect(() => {
    if (wallet.connected) {
      checkAccount();
      getTikToks();
    }
  }, []);

  const checkAccount = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("user"), wallet.publicKey.toBuffer()],
      program.programId
    );

    try {
      const userInfo = await program.account.userAccount.fetch(user_pda);
      console.log(userInfo);

      setUserDetail(userInfo);
      setIsAccount(true);
    } catch (e) {
      setIsAccount(false);
    }
  };

  return (
    <>
      {isAccount ? (
        <div>
          {newVideoShow && (
            <UploadModal
              description={description}
              videoUrl={videoUrl}
              newVideo={newVideo}
              setDescription={setDescription}
              setVideoUrl={setVideoUrl}
              setNewVideoShow={setNewVideoShow}
            />
          )}
          <div className={styles.appVideos}>
            {tiktoks.length === 0 ? (
              <h1>No Videos</h1>
            ) : (
              tiktoks.map((tiktok, id) => (
                <Video
                  address={tiktok.publicKey.toBase58()}
                  url={tiktok.account.videoUrl}
                  channel={tiktok.account.creatorName}
                  index={tiktok.account.index.toNumber()}
                  likes={tiktok.account.likes}
                  description={tiktok.account.description}
                  likeVideo={likeVideo}
                  likesAddress={tiktok.account.peopleWhoLiked}
                  createComment={createComment}
                  getComments={getComments}
                  commentCount={tiktok.account.commentCount.toNumber()}
                  key={id}
                />
              ))
            )}
          </div>
          <BottomBar
            setNewVideoShow={setNewVideoShow}
            getTikToks={getTikToks}
          />
        </div>
      ) : (
        <SignUp signup={signup} wallet={wallet.publicKey.toBase58()} />
      )}
    </>
  );
};

export default MainView;
