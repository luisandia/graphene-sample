import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

const AudioPlayer: React.FC<Props> = ({ url }) => (
  <div>
    <ReactPlayer url={url} height="50px" width="500px" controls={true} />
  </div>
);

export default AudioPlayer;
