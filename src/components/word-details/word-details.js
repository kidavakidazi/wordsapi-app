import React, { useState, useContext, useEffect} from "react";
import { WordContext} from "../app/app";
import WapiService from "../wapi-service/wapi-service";
import { Link } from "react-router-dom";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    marginLeft: '35%',
    marginRight: '35%',
    marginBottom: '50px',
    borderRadius: 16,
    boxShadow: '0 8px 16px 0 #BDC9D7',
    textAlign:'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperMain: {
    fontSize: 20,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const wapiService = new WapiService();

const WordDetails = () => {

  const classes = useStyles();
  const word = useContext(WordContext)
  const [ label, setLabel ] = useState('')
  const [ similarWords, setSimilarWords ] = useState('')
  const [ definition, setDefinition ] = useState('')
  const [ syllables, setSyllables ] = useState('')
  const [ pronunciation, setPronunciation] = useState('')
  const [ partOfSpeech, setPartOfSpeech ] = useState('')
  const [ synonymsList, setSynonymsList ] = useState('')
  const [ antonymsList, setAntonymsList ] = useState('')
  const [ typeOf, setTypeOf ] = useState('')

  const fetchData = async (wordName) => {

    setDefinition(await wapiService.getDefinition(wordName));
    setPartOfSpeech(await wapiService.getPartOfSpeech(wordName));
    setSyllables(await wapiService.getSyllables(wordName));
    setPronunciation(await wapiService.getPronunciation(wordName));

    const synonyms = await wapiService.getSynonyms(wordName);
    const syn = synonyms.map(el => (
        <Link key={generateUniqueID()} to="/word" onClick={() => changeLabel(el)}>
          <Paper className={classes.paper}>{el}</Paper>
        </Link>
    ));
      setSynonymsList(syn);

    const antonyms = await wapiService.getAntonyms(wordName);
    const ant = antonyms.map(el => (
      <Link key={generateUniqueID()} to="/word" onClick={() => changeLabel(el)}>
        <Paper className={classes.paper}>{el}</Paper>
      </Link>
    ));
      setAntonymsList(ant);

    const similar = await wapiService.getSimilar(wordName);
    const sim = similar.map(el => (
      <Link key={generateUniqueID()} to="/word" onClick={() => changeLabel(el)}>
        <Paper className={classes.paper}>{el}</Paper>
      </Link>
    ));
      setSimilarWords(sim);

    const typeOfItems = await wapiService.getTypeOf(wordName);
    const typeOfItem = typeOfItems.map(el => (
      <Paper key={generateUniqueID()} className={classes.paper}>{el}</Paper>
    ));
      setTypeOf(typeOfItem);
  };

  const changeLabel = (el) => {
    setLabel(el);
  };

  useEffect(() => {
    fetchData(word);
  }, [word]);

  useEffect(() => {
    fetchData(label);
  }, [label]);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {syllables}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {partOfSpeech}
          </Typography>
          <Typography variant="body2" component="p">
            {definition}
            <br />
            {pronunciation}
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.grid}>
        <Grid
          container
          direction="row"
          justify="space-around">
          <Grid item xs={3}>
            <Grid
              container
              direction="column">
                <Paper className={classes.paperMain} elevation={3}>Synonyms</Paper>
              {synonymsList}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              direction="column">
                <Paper className={classes.paperMain} elevation={3}>Antonyms</Paper>
              {antonymsList}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              direction="column">
                <Paper className={classes.paperMain} elevation={3}>Similar to</Paper>
              {similarWords}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              direction="column">
                <Paper className={classes.paperMain} elevation={3}>Type of</Paper>
              {typeOf}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default WordDetails;
