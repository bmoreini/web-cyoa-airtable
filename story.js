// rpg-tollbooth.js

window.onload = start;
// Change this to match ID in your AirTable.
const OPENING_SCENE_ID = 'recBB666OcccN7Eet';

function start() {
    setup();
	/** CHANGE THE FIRST FUNCTION FOR TESTING **/
    getScene(OPENING_SCENE_ID);
}

function getScene(record_id) {
  // Replace with your own AirTable API key.
  // Normally, you will want to keep this private.
  // This key will only be good for a couple of days.
  const key = 'keyCTEV1rBtpMeDDa';
  const base_url = 'appb32htKfdksUMzU'; 
  // Alter this to match your own AirTable base.
  // URL format is
  // https://api.airtable.com/v0/<BASE_ID>/<TABLE_NAME>/<RECORD_ID>?api_key=<YOUR_API_KEY>
  // See airtable.com/api
  const url = `https://api.airtable.com/v0/${base_url}/scenes/${record_id}?api_key=${key}`;

  // Make GET request to AirTable base.
  $.ajax({ url: url, type: 'GET' })
    .done(function (data) {
      // Once AJAX request returns data, we destructure
      // it and store it in variables.
      let choices = [];
      let { title, story, delay } = data.fields;
      // The array of strings is returned as a string by AirTable,
      // so we need to parse it into an array.
      if (story.includes("<br><br>")) {
        story = story.split("<br><br>");
      }
      // Don't bother if the scene doesn't have any choices.
      if (data.fields.choices) {
        // Collect AirTable queries for every choice into an array.
        for (let idx = 0; idx < data.fields.choices.length; idx++) {
          choices.push($.ajax({
            url: `https://api.airtable.com/v0/${base_url}/choices/${data.fields.choices[idx]}?api_key=${key}`,
            type: 'GET'
          }));
        }
        // Use Promise.all() to wait until every query in the array
        // has been returned before proceeding.
        Promise.all(choices)
          .then(function (data) {
            let targetArray = [];

            for (let idx = 0; idx < data.length; idx++) {
              // Destructure the necessary fields.
              // targets is an array
              let { choice, targets } = data[idx].fields;
              targetArray.push({ choice: choice, target: targets[0] });
            }
            setOptions(targetArray);
            displayStory(story, delay);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        displayStory(story, delay);
        // No options available.
        setOptions({});
      }
    })
    .fail(function (err) {
      console.log(err);
    });
}
