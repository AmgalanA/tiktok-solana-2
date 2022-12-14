import { useEffect, useState } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import ShareIcon from "@material-ui/icons/Share";

import { useWallet } from "@solana/wallet-adapter-react";

import styles from "../styles/Sidebar.module.css";

const Sidebar = ({
  address,
  likes,
  //   shares,
  messages,
  onShowComments,
  likeVideo,
  index,
  likesAddress,
}) => {
  const [liked, setLiked] = useState(false);

  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected) {
      likesAddress.forEach((address) => {
        if (wallet.publicKey.toBase58() === address.toBase58()) {
          setLiked(true);
        }
      });
    }
  }, [wallet, likesAddress]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarButton}>
        {liked ? (
          <FavoriteIcon
            fontSize="large"
            style={{ fill: "red", stroke: "red" }}
          />
        ) : (
          <FavoriteIcon
            fontSize="large"
            onClick={(e) => likeVideo(address)}
            s
          />
        )}

        <p>{likes}</p>
      </div>

      <div onClick={onShowComments} className={styles.sidebarButton}>
        <MessageIcon fontSize="large" />
        <p>{messages}</p>
      </div>

      <div className={styles.sidebarButton}>
        <ShareIcon fontSize="large" />
      </div>
    </div>
  );
};

export default Sidebar;
