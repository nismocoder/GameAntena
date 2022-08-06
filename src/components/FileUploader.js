import { getOrientation } from "get-orientation";
import * as React from "react";

import { ImageCropper } from ".";

import { getRotatedImage } from "../utils/canvasUtils";
import { readFile } from "../utils/file";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90
};

function FileUploader({
  children,
  isUploading = false,
  showImageCropper = () => {},
  hideImageCropper = () => {},
  handleUploadedFile = () => {}
}) {
  const [uploadedImage, setUploadedImage] = React.useState({
    source: "",
    name: "",
    type: ""
  });

  const hiddenFileInput = React.useRef(null);

  const handleClick = (element) => {
    element.current.click();
    showImageCropper();
  };

  const handleChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);

      const rotation = ORIENTATION_TO_ANGLE[orientation];

      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setUploadedImage({
        source: imageDataUrl,
        name: file.name,
        type: file.type
      });
    }
  };

  const handleCroppedImage = React.useCallback(
    (croppedImage) => {
      handleUploadedFile(croppedImage);
    },
    [handleUploadedFile]
  );

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-hidden="true"
        onClick={() => handleClick(hiddenFileInput)}
        className="upload-button"
      >
        {children}
      </div>
      {uploadedImage.source && isUploading && (
        <ImageCropper
          image={uploadedImage}
          hideImageCropper={hideImageCropper}
          result={handleCroppedImage}
        />
      )}
      <input
        onChange={handleChange}
        ref={hiddenFileInput}
        type="file"
        style={{ display: "none" }}
        accept="image/png, image/gif, image/jpeg"
      />
    </>
  );
}

export default FileUploader;
