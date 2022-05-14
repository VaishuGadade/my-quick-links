import { Drawer } from "antd";
import { useState } from "react";

export const CustomDrawer = (props: any) => {
  // const { customDrawer, showDrawer } = props;
  const [visible, setVisible] = useState(props.showDrawer);
  console.log("CustomDrawer props", props);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
   setVisible(visible);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        {props.customDrawer}
      </Drawer>
    </>
  );
};
export default CustomDrawer;
