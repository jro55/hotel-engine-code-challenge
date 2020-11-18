import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

export default function ProgressSpinner(props) {
    const classes = useStyles();

    const { visible } = props;
    if (visible) {
        return (
            <div className={classes.displayOverlay}>
                <CircularProgress />
            </div>
        ) 
    }
    return <></>
}

const useStyles = makeStyles((theme) => ({
    displayOverlay: {
        position: 'fixed',
        zIndex: 999,
        overflow: 'show',
        margin: 'auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
    },
    child: {
        margin: 'auto'
    }
  }));