import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const openDemo = (demoPath, history) => {
    history.push("/demo/" + demoPath);
}

function DemoDetails(props) {
    const history = useHistory();

    const demo = props.demo
    return (
        <div>
            <p>{demo.map}</p>
            <p>{demo.demo_path}</p>
            <Button color="primary" component="span" onClick={() => openDemo(demo.demo_path, history)}>
                Open Demo
            </Button>
        </div >
    )
}

export default DemoDetails
