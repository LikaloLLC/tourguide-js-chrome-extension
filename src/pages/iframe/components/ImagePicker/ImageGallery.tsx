import React from 'react';
import { useIframeContext } from '../../contexts/iframeContext';
import { UseState } from './ImagePicker.interface';

const ImageGallery = ({ value, setValue }: UseState) => {
  const iframeContext = useIframeContext();
  const workspaceGallery = iframeContext.state?.workspaceImages;

  return (
    <div className="image-galley-grid">
      {workspaceGallery.map(({ src, name, id }) => (
        <button
          className={`docsie-button docsie-button-ghost ${value === src ? 'docsie-button-selected' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setValue(src);
          }}
          key={id}
        >
          <figure>
            <img src={src} className="image-galley-img" />
            <figcaption className="image-galley-figcaption">{name}</figcaption>
          </figure>
        </button>
      ))}
    </div>
  );
};

export default ImageGallery;
