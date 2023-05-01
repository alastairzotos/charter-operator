import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useAuthState } from "state/auth.state";

import { useNavigate } from "utils/nav";

interface MenuItemProps {
  key: string;
  title: string;
  handle: () => void;
}

export const HomeMenu: React.FC = () => {
  const navigation = useNavigate();
  const { accessToken, logout } = useAuthState();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems: MenuItemProps[] = [
    !accessToken
      ? {
        key: "login",
        title: "Login",
        handle: () => {
          navigation.push("login");
        },
      }
      : null,
    !!accessToken
      ? {
        key: "logout",
        title: "Logout",
        handle: () => {
          logout();
          navigation.push("home");
        },
      }
      : null,
    !!accessToken
      ? {
        key: "bookings",
        title: "Bookings",
        handle: () => {
          navigation.push("bookings");
        },
      }
      : null,
  ].filter(item => !!item);

  const handleMenuItemClick = (item: MenuItemProps) => {
    setMenuOpen(false);
    item.handle();
  };

  return (
    <Menu
      style={styles.menu}
      visible={menuOpen}
      onDismiss={() => {
        setMenuOpen(false);
      }}
      anchor={
        <IconButton
          icon="menu"
          onPress={() => {
            setMenuOpen(true);
          }}
        />
      }
    >
      {menuItems.map((item) => (
        <Menu.Item
          key={item.key}
          title={item.title}
          onPress={() => {
            handleMenuItemClick(item);
          }}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: 200,
    height: 100,
  },
});
