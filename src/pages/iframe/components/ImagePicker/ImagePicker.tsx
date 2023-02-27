import React, { useState } from 'react';
import { useIframeContext } from '../../contexts/iframeContext';
import ImageModal from './ImageModal';
import { ImagePickerProps } from './ImagePicker.interface';

const ImagePicker = ({ stepPosition, srcValue }: ImagePickerProps) => {
  const iframeContext = useIframeContext();
  const [showModal, toggleModalDisplay] = useState(false);
  const placeholder = 'https://via.placeholder.com/228x128/EFEFEF/000000?text=Add+an+image';
  const src = srcValue || placeholder;

  return (
    <>
      {showModal && <ImageModal stepPosition={stepPosition} toggleModalDisplay={toggleModalDisplay} />}
      <div className="style-container">
        <button
          className="docsie-button-ghost"
          style={{ padding: 0 }}
          onClick={(e) => {
            e.preventDefault();
            toggleModalDisplay(true);
          }}
        >
          <img src={src} alt="Step image" draggable="false" width={228} height={128} />
        </button>
        {src !== placeholder && (
          <button
            className="docsie-button docsie-button-icon box image-picker-btn"
            onClick={(e) => {
              e.preventDefault();
              iframeContext.dispatch({
                type: 'STEP_UPDATE',
                payload: {
                  change: { image: null },
                  index: stepPosition,
                },
              });
            }}
          >
            x
          </button>
        )}
      </div>
    </>
  );
};

export default ImagePicker;
