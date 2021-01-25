import React from "react";
import DraggableColorBox from "./DraggableColorbox"
import {SortableContainer} from "react-sortable-hoc";
import DraggableColorbox from "./DraggableColorbox";

function DraggableColorList({ colors, removeColor }) {
    return(
        <div style={{height: "100%"}}>
            {colors.map((color, i) => (
                <DraggableColorbox index={i} key={color.name} color={color.color} name={color.name} handleClick={() => removeColor(color.name)}/>
            ))}
        </div>
    )
}

export default SortableContainer(DraggableColorList);