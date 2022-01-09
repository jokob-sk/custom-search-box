import './App.css';
import CustomSearch from './customSearch'
import settings from './settings.json';




function App() {


  return (
    <div className="App">
      <header className="App-header">
        <CustomSearch 
          labelStyles = {settings.labelStyles}
          searchStyles = {settings.searchStyles}          
          defaultSearchEngine = {settings.searchSettings.defaultSearchEngine}
          keepDefaultIcon = {settings.searchSettings.keepDefaultIcon}
          animationEnd = {settings.searchSettings.styles.opacityAtAnimationEnd}
          animationStart = {settings.searchSettings.styles.opacityAtAnimationStart}
          minWidth = {settings.searchSettings.styles.minScreenWidthToEnableHide}
          hideDuration = {settings.searchSettings.styles.hideAnimationDurationSeconds}
          hideDelay = {settings.searchSettings.styles.hideAnimationDelaySeconds} 
          bookmarks = {settings.bookmarks}     
          searchEngines = {settings.searchSettings.searchEngines}
          />        
      </header>
    </div>
  );
}

export default App;
