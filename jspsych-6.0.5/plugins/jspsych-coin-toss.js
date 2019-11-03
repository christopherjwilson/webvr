/*
 * Example plugin template
 */

jsPsych.plugins["coin-toss"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "coin-toss",
    parameters: {
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      win_value: {
        type: jsPsych.plugins.parameterType.INT, 
        default: undefined
      },
      loss_value: {
        type: jsPsych.plugins.parameterType.INT,
        default: undefined
      },
      result: {
        type: jsPsych.plugins.parameterType.STRING,
        default: "none"
      },
      win: {
        type: jsPsych.plugins.parameterType.BOOL,
        default: false
      },
      start_amount: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1
      },
      end_amount: {
        type: jsPsych.plugins.parameterType.INT,
        default: 0
      },
      modifier: {
        type: jsPsych.plugins.parameterType.INT,
        default: 1
      }

    }
  }

  plugin.trial = function(display_element, trial) {

    // Get the start amount for the trial
    console.log(jsPsych.data.get().last(1).values()[0]. current_amount);
   
    getLastTrialAmount = function() {
    var lastTrial = jsPsych.data.get().last(1).values()[0].current_amount;
    if (lastTrial != undefined){ 
      return lastTrial;
    } else {
      jsPsych.data.addProperties({current_amount: trial.start_amount});
      return 0;}
    

  }

    

  // select the trial that will be used for the coin toss (or not if participant chose not to gamble.) 
   selectTrial = function () {
    var myTrials = jsPsych.data.get().filter({phase: 'coin_toss_trial'}).select("gambled").values ;
    console.log(myTrials);
    var activeTrial = Math.floor(Math.random() * myTrials.length);

   

    return activeTrial;

  } ;

  var lotteryTrial = selectTrial();
  console.log("trial # " + lotteryTrial);

// check if the participant chose to gamble on this trial
 var checkIfGambled = function(lotteryTrial) {
    var gambled = jsPsych.data.get().filter({phase: 'coin_toss_trial'}).values()[lotteryTrial].gambled;
    console.log(gambled);
    return gambled;
  }


  // IF the participant did not gamble

  displayDidNotGamble = function(lotteryTrial) {
    jsPsych.data.addProperties({bonus_lottery: false});
    var new_html = '<div style="font-size:60px; margin:20px; line-height:70px;"> Trial number ' + lotteryTrial + ' was selected by the computer at random from the previous coin toss task. In this trial, you chose not to toss the coin. Therefore you will not toss the coin for real now. </div><div style="font-size:60px; margin:20px; line-height:70px;">Press "Y" to continue.</div>';
    display_element.innerHTML = new_html;
  };

  // if the participant did gamble

  displayCoinToss = function(lotteryTrial) {
    jsPsych.data.addProperties({bonus_lottery: true});
    trial.win_value = jsPsych.data.get().filter({phase: 'coin_toss_trial'}).values()[lotteryTrial].win_value * trial.modifier;
    trial.loss_value = jsPsych.data.get().filter({phase: 'coin_toss_trial'}).values()[lotteryTrial].loss_value * trial.modifier;

    console.log(trial.win_value + "" + trial.loss_value + "" + trial.start_amount);


    var new_html = '<div id = "amount">You currently have a bonus payment of: £' + trial.start_amount +' </div><div id="coin"> <div class="side-a"></div> <div class="side-b"></div></div> <div id = "win_value"> If you win, you will gain an additional £'+ trial.win_value +'</div><div id = "loss_value"> If you lose, you will lose £ '+ trial.loss_value +'</div>';
 
       // add prompt
    if(trial.prompt !== null){
      new_html += trial.prompt;
    }
 
    // draw
    display_element.innerHTML = new_html;

  };
   
  
if (checkIfGambled(lotteryTrial) == true ) {
  
  displayCoinToss(lotteryTrial);
} else {
  displayDidNotGamble(lotteryTrial); 
}


    
var tossCoin = function() {

  var flipResult = Math.random();
          var coinresult = null;
          $('#coin').removeClass();
          setTimeout(function(){
            if(flipResult <= 0.5){
              $('#coin').addClass('heads');
              console.log("heads");
              coinresult = "heads";
     
            }
            else{
              $('#coin').addClass('tails');
              console.log("tails");
              coinresult = "tails";
               
              
            }
             
           
           showResult(coinresult, response.key);
          }, 100);
 

  
};

var showResult = function(result, selection){
response.result = result;



setTimeout( function(){
var win = Boolean;
var new_html = String;
switch(result){
  case "heads":
  if (selection == 72) {
    win = true;
    trial.result = "heads";
    trial.end_amount = trial.start_amount + trial.win_value;
    new_html = "<p>The result was: Heads</p><p>You chose: Heads</p><h2>You win this toss!</h2><div id = 'amount'>You now have a bonus payment of: £" + trial.end_amount +" </div>";
  
  } else {
    win = false;
    trial.result = "heads";
    trial.end_amount = trial.start_amount - trial.loss_value;
    new_html = "<p>The result was: Heads</p><p>You chose: Tails</p><h2>You did not win this toss :(</h2><div id = 'amount'>You now have a bonus payment of: £" + trial.end_amount +" </div>";
  }

break;
case "tails":
if (selection == 84) {
  win = true;
  trial.result = "tails";
  trial.end_amount = trial.start_amount + trial.win_value;
  new_html = "<p>The result was: Tails</p><p>You chose: Tails</p><h2>You win this toss!</h2><div id = 'amount'>You now have a bonus payment of £" + trial.end_amount +" </div>";
} else {
  win = false;
  trial.result = "tails";
  trial.end_amount = trial.start_amount - trial.loss_value;
  new_html = "<p>The result was: Tails </p><p>You chose: Heads </p><h2>You did not win this toss :(</h2><div id = 'amount'>You now have a bonus payment of £" + trial.end_amount +" </div>";
}
break;
}

trial.win = win;

  // draw
  display_element.innerHTML = new_html;
jsPsych.data.addProperties({bonus_amount: trial.end_amount});
  
  setTimeout(function(){
    end_trial();
  }, 3000)


}, 3000 )



};


 
    // function to end trial when it is time
    var end_trial = function() {

      
   
 

    // data saving
    var trial_data = {
      "rt": response.rt,
      "stimulus": trial.stimulus,
      "key_press": response.key,
      "result": trial.result,
      "win": trial.win,
      "bonus_amount": trial.end_amount,
      "start_amount": trial.start_amount,
      "win_value": trial.win_value,
      "loss_value": trial.loss_value
    };
 
      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();
 
      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
     // end trial
   jsPsych.finishTrial(trial_data);
    };

      // store response
      var response = {
        rt: null,
        key: null,
        
      };

    var after_response = function(info) {
 
     
     
      
 
      // only record the first response
      if (response.key == null) {
        response = info;
      }
 
      if (trial.response_ends_trial) {
        if (checkIfGambled(lotteryTrial)== false) {
            end_trial();
        } else {
       // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#coin').className += ' responded';
             tossCoin();
        }
  
      }
    };

      // start the response listener
      if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'date',
          persist: false,
          allow_held_key: false
        });
      }

       // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#coin').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }
 
    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
   
    
  };

  return plugin;
})();
