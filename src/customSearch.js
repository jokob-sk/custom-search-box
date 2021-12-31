import React, { useState } from 'react';
import settings from './settings.json';
import { InputAdornment,TextField, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const hideDelay = settings.searchSettings.styles.hideAnimationDelaySeconds + "s";
const hideDuration = settings.searchSettings.styles.hideAnimationDurationSeconds+ "s";
const minWidth = settings.searchSettings.styles.minScreenWidthToEnableHide;
const animationStart = settings.searchSettings.styles.opacityAtAnimationStart;
const animationEnd = settings.searchSettings.styles.opacityAtAnimationEnd;
const textColor = settings.searchSettings.styles.textColor;
const backgroundColor = settings.searchSettings.styles.backgroundColor;



function CustomSearch() {
    const [searchQuery, setSearchQuery] = useState("");   
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
        search: {   
          padding: "4px",
          backgroundColor: backgroundColor,    
          minHeight: "10%",
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
            "to": searchQuery.length !== 0 ? {
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

    const classes = useStyles();

    function handleChange (event) {
        setSearchQuery(event.target.value)
      }
    
    
    function handleKeyPress (event) {
        if(event.key === 'Enter'){
    
        // search (not a full URL with http/https)
        if(!searchQuery.startsWith('http://') && !searchQuery.startsWith('https://'))
        {
            // use default search engine if not overriden
            var searchEngine = settings.searchSettings.defaultSearchEngine;
            var searchQueryNew = searchQuery;
            console.log(settings.searchSettings)
            // overriding the default search engine        
            if(searchQuery.length > 3 && searchQuery[1] === ' ')
            {
            settings.searchSettings.searchEngines.map(function(engine){              
                if(engine.key === searchQuery[0].toLowerCase() )
                {
                    searchEngine = engine.url;
                    searchQueryNew = searchQuery.slice(2);
                }                
                return null;
                }              
            )         
            }
            // execute search
            document.location.href = searchEngine + searchQueryNew;
        
        }
        // searchquery is full URL so just redirect (a full URL with http/https))
        else{
            document.location.href = searchQuery;
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
                autoFocus={true}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon className={settings.searchSettings.styles.searchIconSVGPath} />
                    </InputAdornment>
                ),
                }}
            />

        </React.Fragment>
    )
    
}

export default CustomSearch;