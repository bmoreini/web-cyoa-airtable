# web-cyoa-airtable
Using AirTable as a Database, connecting to AirTable API via JQuery and Ajax.

Files include:

    index.html [The only change links to the jquery script needed for ajax call.]
    rpg-tollbooth.js [all functions and choices removed, handled by database. Commenting explains functionality.]
    webhelper.js [text delay removed - not supported currently]
    Two .cvs files which can be imported to an AirTable base named Scenes and Choices

The code is currently configured to connect to a test base on AirTable. This includes the API key for the test base, which should be replaced with the API for the base you create with uploads from YOUR game design, similar in structure to Scenes and Choices to start.

To configure the code to run with a different base, make the following changes to rpg-tollboth.js (you'll be able to get all the API info for your base at http://airtable.com/api):

    Line 5: Change OPENING_SCENE_ID to the id for this record in your base (you'll probably be able to find this in the Example Request for the List Records section at airtable.com/api.
    Line 17: Change key to your API key. (Note: Your key should be scrubbed from any file that will get pushed to a public GitHub repository. One possibility is to store the variable in a configure.js file, add a script link to that file in index.html, and add configure.js to your .gitignore list.)
    Lines 22 and 41: Change URL to point to your base (you can find the base's URL at airtable.com/api). It is in the format https://api.airtable.com/v0/<BASE_ID>/<TABLE_NAME>/<RECORD_ID>?api_key=<YOUR_API_KEY>
    Set up a new AirTable base if you haven't yet done so.
    Import the two .csv files to create a pair of tables. The table created from 'Scenes-Grid view.csv' is the table that has its URL assigned at line 22 of rpg-tollbooth.js. The table from 'Choices-Grid view.csv' is the table that has its URL in the AJAX call at line 41.
    In the table from 'Scenes-Grid view.cvs', customize the following field types:
        story: Long text
        choices: Link to another record (select the other table)
        targets: Link to another record (select the other table)
        delay: number
    In the table from 'Choices-Grid view.cvs', customize the following field types:
        scene: Link to another record (select the other table)
        targets: Link to another record (select the other table)
        
Simcha Wood, truthfulthomas@gmail.com
