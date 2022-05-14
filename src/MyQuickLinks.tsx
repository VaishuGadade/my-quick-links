import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { List } from "antd";
import { getuid } from "process";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { idText } from "typescript";

import "./MyQuickLinks.css";
import NewCollection, { Values } from "./NewCollection";
import EditCollection from "./EditCollection";
import CollectionEditForm from "./EditCollection";
interface QuickLink {
  id: string;
  title: string;
  url: string;
  type: string;
}

const links: QuickLink[] = [
  {
    id: "1",
    title: "Google",
    url: "http://google.com",
    type: "tab",
  },
  {
    id: "2",
    title: "Youtube",
    url: "http://youtube.com",
    type: "tab",
  },
  {
    id: "3",
    title: "rajgadade",
    url: "http://rajgadade.com",
    type: "window",
  },
];

const openLink = (url: string, type: string) => {
  console.log(url, type);
  if (type === "" || type === undefined) {
    type = "tab";
  }
  if (type === "tab") {
    window.open(url, "_blank");
    return;
  }
  // open in new window;
  if (type === "window") {
    var windowFeatures = "popup,opener";
    const win = window.open(url, "myWindow", windowFeatures);
    win?.focus();
    return;
  }
};

export const MyQuickLinks = () => {

  
   const[editFromVisibility, seteditFromVisibility] = useState(false);
   const[editItem, setEditItem] = useState({ title:"", description:"", modifier:""});
  const onDelete = (id: any) => {
    console.log("Deleting item: ", id);
    const rr = data.splice(data.indexOf(id), 1);

    console.log("Deleting item: ", rr);
    setLinkElements(rr);

  };

  const onEdit = (item: any) => {
    // console.log("Editing item: ",id);
    // const rr = data.splice(data.indexOf(id),1);
    // console.log("Editing item: ",rr)
    //setLinkElements(rr);
    seteditFromVisibility(true);
    setEditItem({ title:item.title, description:item.url, modifier:""});
    console.log(editFromVisibility);
    
  }
  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    const newLInkItem = {
      id: "1",
      title: values.title,
      url: values.url,
      type: values.modifier,
    };
    const newLInk = (
      <>
        <a
          key={newLInkItem.id}
          onClick={() => openLink(newLInkItem.url, newLInkItem.type)}
        >
          {newLInkItem.title}{" "}
        </a>
        <span onClick={ () => onEdit(newLInkItem)}>
          <EditOutlined />
        </span>
        <span onClick={() => onDelete(newLInkItem)}>
          <CloseCircleOutlined />
        </span>
      </>
    );
    console.log(newLInk);
    data.push(newLInk);
    setLinkElements(data);
    // seteditFromVisibility(false);
  };
  
  const data = links.map((item) => {
    const newLInk = (
      <>
        <a key={item.id} onClick={() => openLink(item.url, item.type)}>
          {item.title}{" "}
        </a>
        
        <span onClick={() => onEdit(item)}>
        
        <EditOutlined />
        </span>
        <span onClick={() => onDelete(item)}>
          <CloseCircleOutlined />
        </span>

      </>
    );
    return newLInk;
  });
  const [linkElements, setLinkElements] = useState(data);
  

  useEffect(() => {
    setLinkElements(data);
  }, []);

  return (
    <>
      <PageHeader className="site-page-header" title="Quick links"></PageHeader>

      <NewCollection
        onCreate={onCreate}
        visible={false}
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></NewCollection>
      <CollectionEditForm
    onCreate={(onCreate)}
    visible={editFromVisibility}
    onCancel={function (): void {
      seteditFromVisibility(false);
    }}
    editItem = {editItem}
  ></CollectionEditForm>
      <List
        size="small"
        dataSource={linkElements}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};
export default MyQuickLinks;
