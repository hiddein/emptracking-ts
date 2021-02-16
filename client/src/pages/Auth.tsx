import React from 'react';

export interface newProps {
    name?: string
}
 
const New: React.FC<newProps> = (props) => {
    return ( 
        <div>
            sdasd {props.name}
        </div>
     );
}

 
export default New;