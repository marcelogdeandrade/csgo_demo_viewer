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

  const renderDemos = (demos) => {
    return demos.map(demo => {
      return (
        <div className={classes.listItem}>
          <DemoDetail
            demo={demo} />
        </div>

      )
    })
  }

  return (
    <List >
      {renderDemos(props.demos.data)}
    </List >
  )
}

export default DemoList
