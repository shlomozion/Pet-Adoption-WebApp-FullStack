import { useState, useEffect } from "react";

export default function useImageValidator() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [userImg, setUserImg] = useState("");
  const [closeButton, setCloseButton] = useState(false);

  const imageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    e.target.value = null;
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    if (!closeButton) {
      setIsUploaded(false);
      setFileDataURL(null);
      setFile("");
      setUserImg("");
    }
  }, [closeButton]);

  useEffect(() => {
    isUploaded && setCloseButton(true);
  }, [isUploaded]);

  useEffect(() => {
    if (typeof fileDataURL === "string") {
      setIsUploaded(true);
      setCloseButton(true);
      setUserImg(file);
    }
  }, [fileDataURL]);

  return {
    userImg,
    isUploaded,
    fileDataURL,
    file,
    closeButton,
    setCloseButton,
    imageChangeHandler,
  };
}
export { useImageValidator };
