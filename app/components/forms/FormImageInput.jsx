import { useFormikContext } from "formik";
import React from "react";

import ImageInput from "../ImageInput";
import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

function FormImageInput({ name }) {
  const { errors, setFieldValue, touched, setFieldTouched, values } =
    useFormikContext();
  const imageUris = values[name];
  const handleAdd = (imageUri) => {
    setFieldValue(name, [imageUri, ...imageUris]);
  };

  const handleRemove = (imageUri) => {
    const filtered = imageUris.filter((item) => imageUri !== item);
    setFieldValue(
      name,
      imageUris.filter((item) => imageUri !== item)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        onChange={(imageUris) => {
          setFieldTouched(name);
          setFieldValue(name, imageUris);
        }}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImageInput;
