import {Menu, MenuList, MenuItem, MenuButton, Button} from "@chakra-ui/react";

interface MenuItemType {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: MenuItemType[];
}

interface ContextMenuProps {
  items: MenuItemType[];
  menuPosition: {x: number; y: number};
  closeMenu: () => void;
  isOpen: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({items, menuPosition, closeMenu, isOpen}) => {
  return (
    <Menu isOpen={isOpen} onClose={closeMenu}>
      <MenuList position="absolute" left={`${menuPosition.x}px`} top={`${menuPosition.y}px`}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            isDisabled={item.disabled}
            onClick={() => {
              item.onClick && item.onClick();
              closeMenu();
            }}
          >
            <span style={{flex: 1}}>{item.label}</span>
            {!item.children && item.shortcut && (
              <span style={{marginLeft: "auto", opacity: 0.6}}>{item.shortcut}</span>
            )}
            {item.children && (
              <Menu>
                <MenuButton
                  as={Button}
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  ml={2}
                  size="xs"
                >
                  {item.children && <span>▶</span>}
                </MenuButton>
                <MenuList position="absolute">
                  {item.children.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      isDisabled={subItem.disabled}
                      onClick={() => {
                        subItem.onClick && subItem.onClick();
                        closeMenu();
                      }}
                    >
                      {subItem.label}
                      {subItem.shortcut && (
                        <span style={{marginLeft: "auto", opacity: 0.6}}>{subItem.shortcut}</span>
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
