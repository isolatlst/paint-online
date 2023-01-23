import React from "react";
import "../styles/toolbar.scss";
import ToolBar from "./ToolBar";
import SettingsBar from "./SettingsBar";
import Canvas from "./Canvas";

const Field = () => {
    return <>
        <ToolBar/>
        <SettingsBar/>
        <Canvas/>
    </>
};

export default Field;
