import React, { useState } from 'react';
import { useIframeContext } from '../../contexts/iframeContext';
import ImageGallery from './ImageGallery';
import { ImageModalProps } from './ImagePicker.interface';
import ImageUrl from './ImageUrl';

const ImageModal = ({ stepPosition, toggleModalDisplay }: ImageModalProps) => {
  const [imgType, setImageType] = useState<'url' | 'gallery'>('gallery');
  const [value, setValue] = useState('');
  const iframeContext = useIframeContext();

  return (
    <div className="docsie-dialog docsie-popover image-modal-container" style={{ margin: 0 }}>
      <div className="docsie-dialog-header">
        <svg className="icon icon--image" viewBox="0 0 20 20" width="32" height="32">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-image"></use>
        </svg>
      </div>
      <div className="docsie-dialog-body image-modal-container-body">
        <div className="docsie-tab-head docsie-button-group docsie-txt-small docsie-txt-center image-modal-container-mg-top">
          <button
            className={`docsie-button docsie-button-small ${imgType === 'gallery' ? 'docsie-button-selected' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setImageType('gallery');
            }}
          >
            <span>Workspace gallery</span>
          </button>
          <button
            className={`docsie-button docsie-button-small ${imgType === 'url' ? 'docsie-button-selected' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setImageType('url');
            }}
          >
            <span>Direct URL</span>
          </button>
        </div>
        <div className="image-modal-container-mg-top image-modal-container-hg">
          {imgType === 'url' && <ImageUrl value={value} setValue={setValue} />}
          {imgType === 'gallery' && <ImageGallery value={value} setValue={setValue} />}
        </div>
        <div className="docsie-dialog-actions">
          <button
            className="docsie-button docsie-button-primary"
            onClick={(e) => {
              e.preventDefault();
              iframeContext.dispatch({
                type: 'STEP_UPDATE',
                payload: {
                  change: { image: value },
                  index: stepPosition,
                },
              });
              toggleModalDisplay(false);
            }}
          >
            Confirm
          </button>
          &nbsp; &nbsp;
          <button
            className="docsie-button"
            onClick={(e) => {
              e.preventDefault();
              toggleModalDisplay(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
