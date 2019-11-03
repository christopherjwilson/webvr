/*
 * Example plugin template
 */

jsPsych.plugins["card-flip"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "card-flip",
    parameters: {
      parameter_name: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1
      },
    
    }
  }

  plugin.trial = function(display_element, trial) {
    var html_1 = '<h1>Please click to choose a card. If you choose correctly, you will be able to play one of your choices in the coin-toss task for real money (as a bonus payment).</h1>' 
    var new_html = '<div class="flip-card"> <div class="flip-card-inner"> <div class="flip-card-front"> <img src="card_back.png" alt="Avatar" style="width:120px;height:160px;"> </div> <div class="flip-card-back"> <p>Not this time!</p><p>Thanks for participating!</p> </div> </div> </div>'

    display_element.innerHTML += html_1;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    display_element.innerHTML += new_html;
    // data saving
    var trial_data = {
      parameter_name: trial.parameter_name
    };

    // end trial
    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
