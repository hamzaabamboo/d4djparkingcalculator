const MAXSTEPS = 10000;

function test() {
  var start = Math.abs(Number(document.getElementById("starting").value));
  var end = Math.abs(Number(document.getElementById("ending").value));
  var maxscore = Math.abs(Number(document.getElementById("maxscore").value));
  var bonus = Number(document.getElementById("team").value);
  var type = document.getElementById("Bingo").checked
    ? "Bingo"
    : document.getElementById("Poker").checked
    ? "Poker/Raid"
    : "Medley";
  var flexible = document.getElementById("flexible").checked;
  //document.getElementById("console").value=flexible+"...\n\n"
  var step = 1;
  var flameCount = 0;
  var originalTarget = start;
  document.getElementById("console").value = "";

  var interval = type == "Medley" ? 15000 : 10000;

  maxscore = Math.floor(maxscore / interval) * interval;

  function EPCalc(voltage, score, bonus) {
    if (voltage > 0) {
      switch (type) {
        case "Bingo":
          {
            return (
              voltage *
              Math.floor(
                (1 + bonus) * Math.max(10, Math.floor(score / interval))
              )
            );
          }
          break;
        case "Medley":
          {
            return (
              voltage *
              Math.floor((1 + bonus) * (10 + Math.floor(score / interval)))
            );
          }
          break;
        case "Poker/Raid":
          {
            return (
              voltage *
              Math.floor((1 + bonus) * (50 + Math.floor(score / interval)))
            );
          }
          break;
      }
    } else {
      return Math.round(bonus * 10) + 10;
    }
  }

  function EvenOdd(val) {
    return val % 2 == 0 ? "even" : "odd";
  }

  function TryBiggestGain(tbonus) {
    var voltage = 5;
    for (var i = maxscore; i >= maxscore * 0.8; i -= interval) {
      if (start + EPCalc(voltage, i, tbonus) < end - 10) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        if (EvenOdd(start + EPCalc(voltage, i, tbonus)) == EvenOdd(end - 10)) {
          //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
          start += EPCalc(voltage, i, tbonus);
          flameCount += voltage;
          document.getElementById("console").value +=
            "Step " +
            step++ +
            ") Using " +
            voltage +
            " voltage w/" +
            Math.round(tbonus * 100) +
            "% team, score between " +
            i +
            "~" +
            (i + interval - 1) +
            " pts. EP +" +
            EPCalc(voltage, i, tbonus) +
            ". Remaining:" +
            (end - start) +
            " EP \n";
          return true;
        }
      }
    }
    return false;
  }

  function TrySmallerGain(voltage, tbonus) {
    for (var i = maxscore; i >= maxscore * 0.8; i -= interval) {
      if (start + EPCalc(voltage, i, tbonus) < end - 10) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        if (EvenOdd(start + EPCalc(voltage, i, tbonus)) == EvenOdd(end - 10)) {
          //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
          start += EPCalc(voltage, i, tbonus);
          flameCount += voltage;
          document.getElementById("console").value +=
            "Step " +
            step++ +
            ") Using " +
            voltage +
            " voltage w/" +
            Math.round(tbonus * 100) +
            "% team, score between " +
            i +
            "~" +
            (i + interval - 1) +
            " pts. EP +" +
            EPCalc(voltage, i, tbonus) +
            ". Remaining:" +
            (end - start) +
            " EP \n";
          return true;
        }
      }
    }
    return false;
  }

  function TrySmolGain(voltage, tbonus) {
    for (var i = maxscore; i >= 0; i -= interval) {
      if (
        EPCalc(voltage, i, tbonus) >= 10 + Math.round(bonus * 10) &&
        start + EPCalc(voltage, i, tbonus) <=
          end - (10 + Math.round(bonus * 10))
      ) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        if (EvenOdd(start + EPCalc(voltage, i, tbonus)) == EvenOdd(end - 10)) {
          //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
          start += EPCalc(voltage, i, tbonus);
          flameCount += voltage;
          document.getElementById("console").value +=
            "Step " +
            step++ +
            ") Using " +
            voltage +
            " voltage w/" +
            Math.round(tbonus * 100) +
            "% team, score between " +
            i +
            "~" +
            (i + interval - 1) +
            " pts. EP +" +
            EPCalc(voltage, i, tbonus) +
            ". Remaining:" +
            (end - start) +
            " EP \n";
          return true;
        }
      }
    }
    for (var i = maxscore; i >= 0; i -= interval) {
      if (
        EvenOdd(start + EPCalc(voltage, i, tbonus)) != EvenOdd(end - 10) &&
        start + EPCalc(voltage, i, tbonus) == end
      ) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
        start += EPCalc(voltage, i, tbonus);
        flameCount += voltage;
        document.getElementById("console").value +=
          "Step " +
          step++ +
          ") Using " +
          voltage +
          " voltage w/" +
          Math.round(tbonus * 100) +
          "% team, score between " +
          i +
          "~" +
          (i + interval - 1) +
          " pts. EP +" +
          EPCalc(voltage, i, tbonus) +
          ". Remaining:" +
          (end - start) +
          " EP \n";
        return true;
      }
    }
    /*for (var i=maxscore;i>=0;i-=interval) {
				if ((start+EPCalc(voltage,i,tbonus))==end) {
					//document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
					//document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
					start+=EPCalc(voltage,i,tbonus)
					flameCount+=voltage
					document.getElementById("console").value+="Step "+(step++)+") Using "+voltage+" voltage w/"+Math.round(tbonus*100)+"% team, score between "+i+"~"+(i+interval-1)+" pts. EP +"+EPCalc(voltage,i,tbonus)+". Remaining:"+(end-start)+" EP \n"
					return true
				}
			}*/
    for (var i = maxscore; i >= 0; i -= interval) {
      if (
        EvenOdd(start + EPCalc(voltage, i, tbonus)) != EvenOdd(end - 10) &&
        start + EPCalc(voltage, i, tbonus) == end
      ) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
        start += EPCalc(voltage, i, tbonus);
        flameCount += voltage;
        document.getElementById("console").value +=
          "Step " +
          step++ +
          ") Using " +
          voltage +
          " voltage w/" +
          Math.round(tbonus * 100) +
          "% team, score between " +
          i +
          "~" +
          (i + interval - 1) +
          " pts. EP +" +
          EPCalc(voltage, i, tbonus) +
          ". Remaining:" +
          (end - start) +
          " EP \n";
        return true;
      }
    }
    return false;
  }

  function TryEqualGain(voltage, tbonus) {
    for (var i = maxscore; i >= 0; i -= interval) {
      //document.getElementById("console").value+=(start+EPCalc(voltage,i,tbonus))+"/"+end+"\n"
      if (start + EPCalc(voltage, i, tbonus) == end) {
        //document.getElementById("console").value+="Ending value needs to be "+EvenOdd(end-10)+"\n"
        //document.getElementById("console").value+=EvenOdd(start+EPCalc(voltage,i,tbonus))+"/"+EvenOdd(end-10)+"\n"
        start += EPCalc(voltage, i, tbonus);
        flameCount += voltage;
        document.getElementById("console").value +=
          "Step " +
          step++ +
          ") Using " +
          voltage +
          " voltage w/" +
          Math.round(tbonus * 100) +
          "% team, score between " +
          i +
          "~" +
          (i + interval - 1) +
          " pts. EP +" +
          EPCalc(voltage, i, tbonus) +
          ". Remaining:" +
          (end - start) +
          " EP \n";
        return true;
      }
    }
    if (end == start) {
      return false;
    } else {
      return undefined;
    }
  }

  function TryMatchingRehearsal(tbonus) {
    //document.getElementById("console").value+=(Math.round(tbonus*10))+10
    if (end - start == Math.round(tbonus * 10) + 10) {
      var gain = Math.round(tbonus * 10) + 10;
      start += gain;
      document.getElementById("console").value +=
        "Step " +
        step++ +
        ") Use Rehearsal w/" +
        Math.round(tbonus * 100) +
        "% team. EP +" +
        gain +
        ". Remaining:" +
        (end - start) +
        " EP \n";
      return false;
    }
    return true;
  }

  function TryRehearsal(tbonus) {
    if (end == start) {
      return false;
    }
    var voltage = 0;
    if ((end - start) % 2 !== 0) {
      return undefined;
    }

    if (end - start > 10 + Math.round(tbonus * 10) + 10) {
      var gain = 10 + Math.round(tbonus * 10);
      start += gain;
      document.getElementById("console").value +=
        "Step " +
        step++ +
        ") Use Rehearsal w/" +
        tbonus * 100 +
        "% team. EP +" +
        gain +
        ". Remaining:" +
        (end - start) +
        " EP \n";
      return true;
    } else if (end - start >= 20) {
      var gain = end - start - 10;
      start += gain;
      document.getElementById("console").value +=
        "Step " +
        step++ +
        ") Use Rehearsal w/" +
        (gain - 10) * 10 +
        "% team. EP +" +
        gain +
        ". Remaining:" +
        (end - start) +
        " EP \n";
      return true;
    } else if ((end - start) % 10 == 0) {
      var gain = 10;
      start += gain;
      document.getElementById("console").value +=
        "Step " +
        step++ +
        ") Use Rehearsal w/0% team. EP +" +
        gain +
        ". Remaining:" +
        (end - start) +
        " EP \n";
      return false;
    } else {
      var gain = end - start;
      start += gain;
      document.getElementById("console").value +=
        "Step " +
        step++ +
        ") Use Rehearsal w/" +
        (gain - 10) * 10 +
        "% team. EP +" +
        gain +
        ". Remaining:" +
        (end - start) +
        " EP \n";
      return false;
    }

    return false;
    /*var voltage=0
			if (end-start>36) {
				start+=26
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+(1.6*100)+"% team. EP +"+EPCalc(voltage,1,1.6)+". Remaining:"+(end-start)+" EP \n"
				return true
			} else
			if (end-start>20) {
				var bonus = (end-start-20)*10
				var gain = end-start-10
				start+=end-start-10
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+(bonus)+"% team. EP +"+gain+". Remaining:"+(end-start)+" EP \n"
				if ((bonus/10)%2!=0) {
					return undefined
				} else {
					return true
				}
			} else {
				if (end-start<10||(end-start)%2!=0) {
					return undefined
				}
				var bonus = ((end-start-10)/20)*2
				start+=end-start
				document.getElementById("console").value+="Step "+(step++)+") Use Rehearsal w/"+((bonus)*100)+"% team. EP +"+EPCalc(voltage,1,bonus)+". Remaining:"+(end-start)+" EP \n"
				
				return false
			}
			return true*/
  }

  if (end - start > 1000000) {
    document.getElementById("console").value =
      "Get closer to target score before using parking calculator!";
  } else {
    var result = true;
    while (start != end) {
      if (flexible) {
        for (var j = bonus; j >= 0; j -= 0.2) {
          while (TryBiggestGain(j)) {
            //document.getElementById("console").value+=+start+" EP"+"\n"
          }
          for (var i = 4; i > 0; i--) {
            while (TrySmallerGain(i, j)) {
              //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
            }
          }
          for (var i = 5; i > 0; i--) {
            while (TrySmolGain(i, j)) {
              //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
            }
          }
        }
      } else {
        while (TryBiggestGain(bonus)) {
          //document.getElementById("console").value+=+start+" EP"+"\n"
        }
        for (var i = 4; i > 0; i--) {
          while (TrySmallerGain(i, bonus)) {
            //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
          }
        }
        for (var i = 5; i > 0; i--) {
          while (TrySmolGain(i, bonus)) {
            //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
          }
        }
      }
      for (var j = bonus; j >= 0; j -= 0.2) {
        result = TryMatchingRehearsal(j);
        if (!result) {
          break;
        }
      }
      if (result) {
        for (var j = 1.6; j >= 0; j -= 0.2) {
          result = TryMatchingRehearsal(j);
          if (!result) {
            break;
          }
        }
      }
      if (result) {
        do {
          if (flexible) {
            for (var j = bonus; j >= 0; j -= 0.2) {
              result = TryRehearsal(j);
            }
          } else {
            result = TryRehearsal(bonus);
          }
        } while (result);
      }

      if (flexible) {
        for (var i = 5; i > 0; i--) {
          for (var j = bonus; j >= 0; j -= 0.2) {
            while ((result = TryEqualGain(i, j))) {
              //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
            }
          }
        }
      } else {
        for (var i = 5; i > 0; i--) {
          while ((result = TryEqualGain(i, bonus))) {
            //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
          }
        }
      }

      start = end;
      if (result === undefined) {
        document.getElementById("console").value =
          "Impossible to park using this team!";
      } else {
        document.getElementById("console").value =
          "Calculating from " +
          originalTarget +
          " to " +
          end +
          " for event type " +
          type +
          "...\n\t(All games are done in Free Live)\n\nFound a park! " +
          (step - 1) +
          " steps and " +
          flameCount +
          " voltage required!\n\n" +
          document.getElementById("console").value;
      }
      //document.getElementById("console").value+="Step "+(step++)+")"+start+" EP"+"\n"
      step++;
    }
  }
}
