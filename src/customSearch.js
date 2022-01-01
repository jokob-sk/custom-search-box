import React, { useState } from 'react';
import settings from './settings.json';
import { InputAdornment,TextField, makeStyles, SvgIcon, Chip } from '@material-ui/core';


const hideDelay = settings.searchSettings.styles.hideAnimationDelaySeconds + "s";
const hideDuration = settings.searchSettings.styles.hideAnimationDurationSeconds+ "s";
const minWidth = settings.searchSettings.styles.minScreenWidthToEnableHide;
const animationStart = settings.searchSettings.styles.opacityAtAnimationStart;
const animationEnd = settings.searchSettings.styles.opacityAtAnimationEnd;
const textColor = settings.searchSettings.styles.textColor;
const backgroundColor = settings.searchSettings.styles.backgroundColor;
const labelBackgroundColor = settings.searchSettings.styles.labelBackgroundColor;
const keepDefaultIcon = settings.searchSettings.keepDefaultIcon;

let searchEngineOverriden = false;
let showSearchBox = false;

function CustomSearch() {
    const [searchQuery, setSearchQuery] = useState("");   
    const [searchEngine, setSearchEngine] = useState(settings.searchSettings.defaultSearchEngine);
    
    const useStyles = makeStyles({
        root: {
          "& .MuiPaper-root": {
            maxWidth: "100px",
            width:"100px",
          },
          "& .MuiGrid-item": {
            width: "inherit",
          },
          backgroundColor: backgroundColor,
          color: textColor+"!important",
          alignContent: "center center",
        },
        label:{
            backgroundColor:labelBackgroundColor,
        },
        search: {   
          padding: "4px",
          backgroundColor: backgroundColor,              
          opacity:animationStart,
          ['@media (min-width:'+minWidth+')']: 
            {
              transitionDelay: hideDelay,          
              width: "40%",
              position: "absolute", 
              padding: "40px",
              opacity: animationStart,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animation: "$loadAnimation "+hideDuration+" ease-in "+hideDelay+"",
              animationFillMode: "forwards"
            },
          '&:hover': {
            ['@media (min-width:'+minWidth+')']: {
                animation: "$hoverAnimation "+hideDuration+" ease-in "+hideDelay+"",
                animationFillMode: "forwards"
            },    
          },    
        },
        "@keyframes loadAnimation": {        
            "to": showSearchBox ? {
                transitionDelay: hideDelay, 
                transition: "opacity 2s",
                opacity: animationStart 
            } :
            {
                opacity: animationEnd
            }
          },
        "@keyframes hoverAnimation": {        
            "to": {
              opacity: animationStart
            }
          },
          "@keyframes typingAnimation": {        
            "to": {
              opacity: animationStart
            }
          }    
    });

    // generate CSS
    const classes = useStyles();

    // capture search input and handle search engine override
    function handleChange (event) {

        const textInput = event.target.value;

        // keep the search box shown if once you override the default search engine, otherwise hide it if search queery is deleted
        showSearchBox = searchEngineOverriden ? true : textInput.length > 0;

        setSearchQuery(textInput)

        // detecting custom search engine override       
        if(textInput.length > 1 && textInput[1] === ' ')
        {
            settings.searchSettings.searchEngines.map(function(engine){              
                    if(engine.key === textInput[0].toLowerCase() )
                    {
                        searchEngineOverriden = true;
                        event.target.value = textInput.slice(2);
                        setSearchEngine(engine); 
                        console.log(searchEngine.iconSVGPath)
                    }                
                    return null;
                }              
            )         
        }
    }   

    function handleOnKeyDown (event) {
        // detect backspace on empty search query
        
    }
    
    function handleKeyPress (event) {        
        if(event.key === 'Enter'){
            // execute search           
            if(searchQuery.startsWith('http://') || searchQuery.startsWith('https://')) // searchquery is full URL so just redirect (a full URL with http/https))
            {
                document.location.href = searchQuery;
            } else if(searchEngine) // search engine
            {                
                document.location.href = searchEngine.url + searchQuery;
            }
        }
    }
        

    return(
        <React.Fragment>
            <TextField 
                className={classes.search}                
                placeholder="Search"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onKeyDown={handleOnKeyDown}
                autoFocus={true}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">    
                        <SvgIcon>
                            <path d={keepDefaultIcon ? settings.searchSettings.defaultSearchEngine.iconSVGPath : searchEngine.iconSVGPath} />
                        </SvgIcon> 
                        {
                        searchEngine.name ?
                                <Chip 
                                    label={searchEngine.name}
                                    size="small"  
                                    className={classes.label}                         
                                /> 
                            :
                                ""
                            }
                    </InputAdornment>
                ),
                }}
            />

        </React.Fragment>
    )
    
}

export default CustomSearch;