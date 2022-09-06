import { useRef, useState } from "react";

import styles from "../styles/Video.module.css";

import Comments from "./Comments";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Video = ({
  address,
  url,
  channel,
  index,
  likes,
  description,
  likeVideo,
  likesAddress,
  createComment,
  getComments,
  commentCount,
}) => {
  const [playing, setPlaying] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const videoRef = useRef(null);

  const onVideoPressed = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const hideComments = () => {
    setShowCommentsModal(false);
  };

  const showComments = () => {
    setShowCommentsModal(true);
  };

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.videoPlayer}
        loop
        onClick={onVideoPressed}
        ref={videoRef}
        src={url}
        style={{ objectFit: "cover" }}
      />

      <Footer channel={channel} description={description} song={index} />
      <Sidebar
        address={address}
        likes={likes}
        // shares={shares}
        onShowComments={showComments}
        likeVideo={likeVideo}
        index={index}
        likesAddress={likesAddress}
        messages={commentCount}
      />

      {showCommentsModal && (
        <Comments
          onHide={hideComments}
          index={index}
          createComment={createComment}
          getComments={getComments}
          commentCount={commentCount}
          address={address}
        />
      )}
    </div>
  );
};

export default Video;
