import React, { useState } from "react";
import { IconButton, Menu } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigate } from "../utils/nav";

interface MenuItemProps {
  key: string;
  title: string;
  handle: () => void;
}

export const HomeMenu: React.FC = () => {
  const navigation = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems: MenuItemProps[] = [
    {
      key: 'setup',
      title: "Connect to server",
      handle: () => navigation.push("setup")
    }
  ];

  const handleMenuItemClick = (item: MenuItemProps) => {
    setMenuOpen(false);
    item.handle();
  }

  return (
    <Menu
      style={styles.menu}
      visible={menuOpen}
      onDismiss={() => setMenuOpen(false)}
      anchor={(
        <IconButton
          icon="menu"
          onPress={() => setMenuOpen(true)}
        />
      )}
    >
      {menuItems.map(item => (
        <Menu.Item key={item.key} title={item.title} onPress={() => handleMenuItemClick(item)} />
      ))}
    </Menu>
  )
}

const styles = StyleSheet.create({
  menu: {
    width: 200,
    height: 100,
  }
})
