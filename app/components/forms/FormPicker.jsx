import React from "react";
import { StyleSheet } from "react-native";

import Picker from "../Picker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { errors, setFieldValue, touched, values, setFieldTouched } =
    useFormikContext();

  return (
    <>
      <Picker
        items={items}
        onClose={() => setFieldTouched(name)}
        onSelectItem={(item) => setFieldValue(name, item)}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});

export default AppFormPicker;
