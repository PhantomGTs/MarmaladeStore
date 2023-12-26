import { useState } from "react";
import VerticalTabs from "./TabPanel";

export const MainLayout = () => {
    const [value, setValue] = useState(0);
    return(
        <div style={{minHeight: "100vh"}}>
            <VerticalTabs value={value} setValue={setValue} />
        </div>
    )
}