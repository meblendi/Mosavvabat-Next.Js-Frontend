

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = '/images/default-organization.png',
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;