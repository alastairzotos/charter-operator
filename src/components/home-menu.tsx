import React, { useState } from "react";
import { IconButton, Menu } from "react-native-paper";
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
      style={{ width: 100, height: 100 }}
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
