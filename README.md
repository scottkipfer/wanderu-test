# wanderu-test

## Installation

Make sure `node > v10 ` is installed.

go to the project root and run:
```
$ npm install
```

## Running the Program
From the project root you can run:
```
$ API_KEY="your_api_key" npm start
```
or
```
$ API_KEY="your_api_key" node index.js
```

see the link in the probelm statement to aquire an API key.

## Problem Statement

Create a quick account here: https://developer.deutschebahn.com/
Write a Node JS or Python program that can find and output the 5 center-most stations in
Berlin and 5 center-most in Hamburg.  Center-most means closest to the known
latitude/longitude center of the given city.  From those stations, find and
output 5 station pairs from Hamburg to Berlin and their travel distances with
the following criteria: The Hamburg station has to have parking. The Berlin
station has to have public transportation available.
This assignment should not take too long, so please scope it as such. Please send the
assignment back to me by next week. If you are busy and need more time, please let me know.
Also, please write your own code for the task (vs forking other repos, etc.).
If you have any questions, feel free to ask.

## Solution

### Design

My solution consists of a main function located in index.js and three moudles to support the function.

#### main

This function utilizes the helper modules to do the following.

1. Query the Deutsche Bahn Api for stations near Hamburg and Berlin
2. Filter the Hambug results to only include stations with parking
3. Filter the Berlin results to only include stations with public transit.
4. Combine the results to station pairs
5. Pick 5 random paris
6. Output the pairs

#### stations
This module handles the domain logic for filter stations and creating station pairs.

It also provides a helper function to format the stations for output.

#### DBApi
This module is used to connect the the Deutsche Bahn Api.
I chose to use the nearby query in the 1BahnQL in order to find stations near a lat/lng pair.
The graphql query also allowed me to specify which fields I wanted to return.
This was helpful to figure out which stations had parking and public transportation.

This is the graphql query I used.
```
{
  nearby(latitude: 53.5511, longitude: 9.9937, radius: 3000) {
     stations(count: 6) {
      name
      hasParking
      hasLocalPublicTransport
      location {
        latitude
        longitude
      }
    }
  }
}
```

notes: The graphql query is convenient to get back the fields I need, but it seems to take a long time.
Also it is strange that I have to pass in `6` to the count field in order to get 5 stations back.
I am guessing this is a problem with the graphql implmentation they have created.

#### utils
Helper functions to do a random selction and to computue the distance between two coordinates in kilometers.
