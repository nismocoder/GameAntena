import React from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import { useScrollableBody } from '../hooks';
import { getCroppedImg } from '../utils/canvasUtils';
import { blobToFile } from '../utils/file';

const ImageCropper = ({ image, imageName, result = () => {} }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  useScrollableBody();

  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
      );

      result(blobToFile(croppedImage, imageName));
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, rotation, result, imageName]);

  const handleRotation = (event) => {
    setRotation(event.target.value);
  };

  const handleZoom = (event) => {
    setZoom(event.target.value);
  };

  return (
    <>
      <Cropper
        classes={{ containerClassName: 'cropper' }}
        image={image}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1 / 1}
        onCropChange={setCrop}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        style={{ top: '50%' }}
      />
      <CropperNav>
        <div className='sliders'>
          <div className='slider-group'>
            <label>Zoom: </label>
            <input
              type='range'
              className='slider'
              min='1'
              max='3'
              step={0.1}
              value={zoom}
              onChange={handleZoom}
            />
          </div>
          <div className='slider-group'>
            <label>Rotation: </label>
            <input
              type='range'
              className='slider'
              min='0'
              max='360'
              value={rotation}
              onChange={handleRotation}
            />
          </div>
        </div>

        <button onClick={showCroppedImage}>Save as profile picture</button>
      </CropperNav>
    </>
  );
};

const CropperNav = styled.div`
  position: absolute;
  top: 60%;
  bottom: 0;
  width: 100%;
  background-color: var(--primary);
  color: var(--light);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  row-gap: 2rem;
  column-gap: 3rem;
  padding: 2rem;
  overflow: hidden;

  .sliders {
    display: flex;
    flex-flow: column;
    gap: 2rem;
    justify-content: flex-end;

    .slider-group {
      display: flex;
      gap: 1rem;
      align-items: center;

      label {
        flex: 1 0 10%;
      }

      .slider {
        max-width: 70%;
      }
    }
  }
`;

export default ImageCropper;
