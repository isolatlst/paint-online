import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";

const SettingsBar = () => {
    return <div className="settingsbar">
        <label>
            <span style={{margin: '0 10px'}}>Line width</span>
            <input type="number" defaultValue={1} min={1} max={10}
                   onChange={e => {
                       toolState.setLineWidth(Number(e.target.value))
                   }
                   }/>
        </label>
    </div>;
};

export default SettingsBar;
