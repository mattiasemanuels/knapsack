import React from 'react';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let socket = io(':3001');

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

function App() {
  const classes = useStyles();
  const [textValue, changeTextValue] = React.useState('');

  const sendChatMessage = () => {
    console.log(textValue);
    socket.emit('scenario:optimize', textValue, (data) => {
      console.log(data);
    });
  };

  return (
    <div className="App">
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={textValue}
        onChange={(e) => changeTextValue(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (textValue) {
            sendChatMessage();
            changeTextValue('');
          }
        }}
      >
        Hello World
      </Button>
    </div>
  );
}

export default App;
