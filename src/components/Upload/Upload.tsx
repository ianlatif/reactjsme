import React, { useState, forwardRef } from "react";
import { Upload } from "antd";
import { DraggerProps } from "antd/lib/upload";
import { RcCustomRequestOptions, UploadFile } from "antd/lib/upload/interface";
import Lightbox from "react-image-lightbox";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

interface UploadFileFormProps extends DraggerProps {
  description?: string;
  uploadType?: string;
  // onChange?: (info: UploadChangeParam<UploadFile<any>>) => void) | undefined)
}

const UploadFileForm = forwardRef(
  ({ uploadType, ...props }: UploadFileFormProps, ref: any) => {
    const [previewImage, setPreviewImage] = useState();
    const [previewVisible, setPreviewVisible] = useState();
    const dummyRequest = ({ file, onSuccess }: RcCustomRequestOptions) => {
      setTimeout(() => {
        onSuccess({ success: "ok" }, file);
      }, 0);
      if (uploadType) {
        if (props.onChange) {
        }
      }
    };

    const onPreview = async (file: UploadFile<any>) => {
      if (!file.url && !file.preview) {
        console.log(file);

        setPreviewImage(URL.createObjectURL(file.originFileObj));
        setPreviewVisible(true);
      }
    };

    return (
      <>
        <Dragger
          {...props}
          ref={ref}
          style={{ padding: 20 }}
          customRequest={dummyRequest}
          className="dragger-costum"
          listType="picture-card"
          onPreview={onPreview}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">{props.description}</p>
        </Dragger>

        {previewVisible && (
          <Lightbox
            mainSrc={previewImage}
            onCloseRequest={() => setPreviewVisible(false)}
          />
        )}
      </>
    );
  }
);

export default UploadFileForm;
