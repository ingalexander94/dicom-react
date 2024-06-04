import React, { useRef, useEffect, useState } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import dicomParser from "dicom-parser";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import Hammer from "hammerjs";
import cornerstoneMath from "cornerstone-math";
import styles from "./videodicom.module.css";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const VideoDicom = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init({});
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setIndex((prevCount) => {
          if (prevCount < imageIds.length) {
            return prevCount + 1;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
            }
            return prevCount;
          }
        });
      }, 50);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIndex(0);
        }
      };
    }
  }, [isRunning]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const dicomData = dicomParser.parseDicom(new Uint8Array(arrayBuffer));

      const numFrames = dicomData.intString("x00280008") || 1;
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

      const newImageIds = [];
      const newFrameIndexes = [];
      for (let i = 0; i < numFrames; i++) {
        newImageIds.push(`${imageId}?frame=${i}`);
        newFrameIndexes.push(i);
      }
      setImageIds(newImageIds);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setIndex(newValue);
  };

  const handlePlay = () => {
    setIndex(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (imageIds.length > 0 && viewportRef.current) {
      const element = viewportRef.current;
      if (element) {
        cornerstone.enable(element);
        const image = imageIds[index];
        if (image) {
          cornerstone.loadImage(imageIds[index]).then((image) => {
            cornerstone.displayImage(element, image);
          });
        }
      }
    }
  }, [index]);

  return (
    <section className={styles.dicom_wrapper}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      <div ref={viewportRef} id={styles.dicomImage} />
      <div className={styles.controls}>
        <button
          disabled={!imageIds.length || isRunning}
          onClick={handlePlay}
          type="button"
        >
          Play
        </button>
        <input
          type="range"
          value={index}
          name="scroll"
          min={0}
          onChange={handleChange}
          disabled={!imageIds.length || isRunning}
          max={imageIds.length}
          step={1}
          id="scroll"
        />
      </div>
    </section>
  );
};

export default VideoDicom;
