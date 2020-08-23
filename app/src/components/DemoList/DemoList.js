import React from 'react'
import DemoDetail from './DemoDetails'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: 10
  }
}));




function DemoList(props) {
  const classes = useStyles()
  const demos = props.demos.data

  const renderDemos = () => {
    return demos.map(demo => {
      return (
        <div className={classes.listItem}>
          <DemoDetail
            removeDemoCallback={props.removeDemoCallback}
            demo={demo} />
        </div>

      )
    })
  }

  return (
    <List >
      {renderDemos()}
    </List >
  )
}

export default DemoList
