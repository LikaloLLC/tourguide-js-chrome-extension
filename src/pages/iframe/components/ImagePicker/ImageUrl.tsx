import React from 'react';
import type { UseState } from './ImagePicker.interface';

const ImageUrl = ({ value, setValue }: UseState) => (
  <>
    <label htmlFor="image" className="image-url-label">
      <p>Image URL: </p>
    </label>
    <input
      name="image"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoFocus={true}
      className="docsie-input-1 image-url-input"
    />
  </>
);

export default ImageUrl;
