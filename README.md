# A simple Custom search box

A search box mimicking browser search bars.

Get them here: https://materialdesignicons.com/

The names of each attribute should be fairly self-explanatory.

If you want to override the search engine specified in the settings.json file use the following characters + a space:

    'e' for https://www.ecosia.org/
    'd' for https://www.duckduckgo.com/
    'g' for https://www.google.com/
    'b' for https://www.bing.com/
    'm' for https://www.google.com/maps/

So for example if you want to use duckduckgo.com to search for the term 'mount bookmark' type d mount bookmark

You can modify these in the settings.json file.

### settings.json

```json
{    
   "searchSettings": {
        "defaultSearchEngine":"https://www.duckduckgo.com/?q=",
        "searchEngines":[
            {
                "key":"e",
                "url":"https://www.ecosia.org/search?q="
            },
            {
                "key":"g",
                "url":"https://www.google.com/search?q="
            },
            {
                "key":"d",
                "url":"https://www.duckduckgo.com/?q="
            },
            {
                "key":"b",
                "url":"https://www.bing.com/search?q="
            },
            {
                "key":"m",
                "url":"https://www.google.com/maps/search/"
            },
            {
                "key":"y",
                "url":"https://www.youtube.com/results?search_query="
            }
        ],
        "styles":{
            "searchBoxClass":"searchBoxClass",
            "searchIconSVGPath":"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
        }
    }
}
```

> **_Note:_**  Currently the only way to use an icon is to use the svg-path. Get it here: https://materialdesignicons.com/

#  :whale: Docker (todo :hammer:) 

The Docker image is available at [jokobsk/Custom search - Docker
Hub](https://registry.hub.docker.com/r/jokobsk/custom-search-box).

The source Docker file is available [here on GitHub](https://github.com/jokob-sk/custom-search-box).

## Changing the configuration
All settings can be found in `settings.json`.

## Support :coffee:

<a href="https://www.buymeacoffee.com/jokobsk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 117px !important;" ></a>
