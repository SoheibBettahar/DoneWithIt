import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import Text from "./Text";
import { Modal } from "react-native";
import { Button } from "react-native";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  onClose = () => {},
  onSelectItem,
  numberOfColumns = 1,
  placeholder,
  PickerItemComponent = PickerItem,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width }]}>
          {icon && (
            <MaterialCommunityIcons
              style={styles.leftIcon}
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
            />
          )}

          {selectedItem ? (
            <Text style={[defaultStyles.text, styles.text]}>
              {selectedItem.label}
            </Text>
          ) : (
            <Text style={[defaultStyles.text, styles.placeholder]}>
              {placeholder}
            </Text>
          )}

          <MaterialCommunityIcons
            style={styles.rightIcon}
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button
            title="Close"
            onPress={() => {
              setModalVisible(false);
              onClose();
            }}
          />
          <FlatList
            style={styles.list}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                  onClose();
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  leftIcon: {
    marginRight: 10,
    alignSelf: "center",
  },
  list: { marginTop: 10 },
  rightIcon: {
    alignSelf: "center",
  },
  placeholder: { flex: 1, color: defaultStyles.colors.medium },
  text: {
    flex: 1,
  },
});

export default AppPicker;
