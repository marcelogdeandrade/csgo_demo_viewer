import React from 'react'
import DemoDetail from './DemoDetails'

const renderDemos = (demos) => {
    return demos.map(demo => {
        return <DemoDetail demo={demo} />
    })
}

function DemoList(props) {
    return (
        <div>
            {renderDemos(props.demos.data)}
        </div>
    )
}

export default DemoList
