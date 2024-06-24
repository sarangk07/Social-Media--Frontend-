'use client'

import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
 
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  
  WhatsappIcon,
  EmailIcon
} from 'react-share';

const ShareButtons = ({ url, title }) => {
  return (
    <div className="flex  space-x-2">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>
      <EmailShareButton url={url} subject={title}>
        <EmailIcon size={24} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
