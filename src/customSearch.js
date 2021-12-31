import React, { useState } from 'react';
import settings from './settings.json';
import { InputAdornment,TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';





function CustomSearch() {

    const [searchQuery, setSearchQuery] = useState("");   

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
            className={settings.searchSettings.styles.searchBoxClass}
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