import { ChangeEvent, useEffect, useRef, useState } from "react";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";
import styles from "./dicom.module.css";

import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const Dicom = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (index && viewportRef.current) {
      cornerstone.enable(viewportRef.current);
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
        files[index]
      );
      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(viewportRef.current!, image);
      });
    }

    return () => {
      cornerstone.disable(viewportRef.current!);
    };
  }, [index]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setIndex((prevCount) => {
          if (prevCount < files.length) {
            return prevCount + 1;
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              setIsRunning(false);
            }
            return prevCount;
          }
        });
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setIndex(0);
        }
      };
    }
  }, [isRunning]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const listFiles = Array.from(event.target.files ?? []);
      setFiles(listFiles.reverse());
      setIndex(1);
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

  return (
    <section className={styles.dicom_wrapper}>
      <input type="file" onChange={handleFileChange} accept=".dcm" multiple />
      <div ref={viewportRef} id={styles.dicomImage} />
      <div className={styles.controls}>
        <button
          disabled={!files.length || isRunning}
          onClick={handlePlay}
          type="button"
        >
          Play
        </button>
        <input
          type="range"
          value={index}
          onChange={handleChange}
          name="scroll"
          min={0}
          disabled={!files.length || isRunning}
          max={files.length}
          step={1}
          id="scroll"
        />
      </div>
    </section>
  );
};

export default Dicom;
