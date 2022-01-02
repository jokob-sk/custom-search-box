import './App.css';
import CustomSearch from './customSearch'
import settings from './settings.json';
import { makeStyles} from '@material-ui/core';



function App() {

  const useStyles = makeStyles({
    label: {
        border: "green 3px solid",
    },
    search: {
        backgroundColor: "blue",     
    }
  });
  
  // generate CSS
  const classes = useStyles();



  return (
    <div className="App">
      <header className="App-header">
        <CustomSearch 
          labelStyles = {settings.labelStyles}
          searchStyles = {settings.searchStyles}
          backgroundColor = {settings.searchSettings.styles.backgroundColor} 
          defaultSearchEngine = {settings.searchSettings.defaultSearchEngine}
          keepDefaultIcon = {settings.searchSettings.keepDefaultIcon}
          labelBackgroundColor = {settings.searchSettings.styles.labelBackgroundColor}
          backgroundColor = {settings.searchSettings.styles.backgroundColor}
          animationEnd = {settings.searchSettings.styles.opacityAtAnimationEnd}
          animationStart = {settings.searchSettings.styles.opacityAtAnimationStart}
          minWidth = {settings.searchSettings.styles.minScreenWidthToEnableHide}
          hideDuration = {settings.searchSettings.styles.hideAnimationDurationSeconds}
          hideDelay = {settings.searchSettings.styles.hideAnimationDelaySeconds}          
          />        
      </header>
    </div>
  );
}

export default App;
