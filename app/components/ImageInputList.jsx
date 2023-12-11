import React, { useRef, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris, onAddImage, onRemoveImage }) {
  const imageList = useRef();
  const imagesWithButton = [...imageUris, null];

  const handleImageChange = (oldImageUriValue, newImageUriValue) => {
    if (newImageUriValue) {
      onAddImage(newImageUriValue);
    } else {
      onRemoveImage(oldImageUriValue);
    }
  };

  return (
    <View>
      <FlatList
        ref={imageList}
        data={imagesWithButton}
        horizontal={true}
        keyExtractor={(item) => item}
        onContentSizeChange={() => imageList.current.scrollToEnd()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageInput
            imageUri={item}
            onImageChanged={(image) => handleImageChange(item, image)}
          />
        )}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ImageInputList;
