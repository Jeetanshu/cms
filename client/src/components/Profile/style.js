import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#000000',
  },
  image: {
    marginLeft: '15px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    maxWidth: 250,
    height: 100,
  },
  media: {
    height: 0,
    paddingTop: '25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  deleteIcon : {
    color: '#e60000',
    marginRight: '0px',
  },
  descriptionTextField : {
    marginTop: '20px',
    marginBottom: '10px',
  },     
}));