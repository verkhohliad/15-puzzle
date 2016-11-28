document.body.style.zoom = screen.width/1000;

var divsList = document.querySelectorAll('.child');
var divParent = document.querySelector('.parent');
var restart = document.querySelector('.restart');
var test1 = document.querySelector('.test1');
var test2 = document.querySelector('.test2');

var WIDTH_HEIGHT_CELL = 105;
//divsList[0].style.opacity = 0;
//divsList[0].innerHTML = 0;

createTable();


/*
for(var i = 0; i < divsList.length; i++) {
  divsList[i].innerHTML = i;
}
*/
test2.onclick = function() {
  for(var i = 2; i < divsList.length; i++) {
  	divs(i).style.opacity = 1;
    divs(i).innerHTML = i;
  }

  divs(1).innerHTML = 0;
  divs(1).style.opacity = 0;

  divs(0).innerHTML = 1;
}

test1.onclick = function() {
  for(var i = 0; i < divsList.length - 2; i++) {
  	divs(i).style.opacity = 1;
    divs(i).innerHTML = i+1;
  }

  divs(divsList.length - 2).innerHTML = 0;
  divs(divsList.length - 2).style.opacity = 0;

  divs(divsList.length - 1).innerHTML = 15;
}

restart.onclick = function() {
  for (var i = 0; i < divsList.length; i++) {
  	divs(i).style.opacity = 1;
  	divs(i).innerHTML = null;
  }

  createTable();
}

divParent.onclick = function(event) {
  var target = event.target;

  var indexOfTarget = searchIndexTarget(target);
  var indexNeighborWithNULL = searchIndexNeighborWithNULL(indexOfTarget);

  if(indexNeighborWithNULL === null) return;

  if(indexNeighborWithNULL != null) {
  	
  	changeCells(divs(indexOfTarget), divs(indexNeighborWithNULL));


  	/*
    divsList[indexNeighborWithNULL].innerHTML = divsList[indexOfTarget].innerHTML;
  	divsList[indexNeighborWithNULL].style.opacity = 1;
  	divsList[indexOfTarget].style.opacity = 0;
  	divsList[indexOfTarget].innerHTML = 0;
  	*/

  	
  }

  if(checkWin() === true) {
  	var win = showWin();

  	win.onclick = function() {
  	  document.body.removeChild(document.querySelector('#win'));
  	  document.body.removeChild(document.querySelector('#block'));
  	}
  }
}


function changeCells(first, second) {
  var coords1 = first.getBoundingClientRect();
  var coords2 = second.getBoundingClientRect();

  first.style.left = coords2.left + 'px';
  first.style.top = coords2.top + 'px';

  second.style.left = coords1.left + 'px';
  second.style.top = coords1.top + 'px';

  var temp = first.value;
  first.value = second.value;
  second.value = temp;

}

function checkWin() {
  for (var i = 0; i < divsList.length-1; i++) {
  	for (var j = i+1; j < divsList.length-1; j++) {
  	  if(+divs(i).innerHTML > +divs(j).innerHTML) {
  	    return false;
  	  }
  	}
  }
  return true;
}

function createTable() {
  var arr = [];

  var randIndex;
  var temp;

  for(var i = 0; i < divsList.length; i++) {
    arr[i] = i;
  }

  for(var i = 0, j = divsList.length - 2; i < divsList.length; i++, j--) {
    randIndex = Math.floor(Math.random() * (j + 1));

    divsList[i].innerHTML = arr[randIndex];
    divsList[i].value = i;

    if(arr.length - 1 != randIndex) {
      temp = arr[arr.length - 1];
      arr.pop();
      arr[randIndex] = temp;
    }
    else if(arr.length - 1 == randIndex) {
      arr.pop();
    }
  }

  for (var i = 0; i < divsList.length; i++) {
  	if(divs(i).innerHTML == 0) {
  	  divs(i).style.opacity = 0;
  	  break;
  	}

  }

  var coords = divParent.getBoundingClientRect();
  
  var index = 0;
  
  for (var i = 0; i < divsList.length / 4; i++) {
    for(var j = 0; j < divsList.length / 4; j++, index++) {
      divs(index).style.left = coords.left + WIDTH_HEIGHT_CELL * j + 'px';
      divs(index).style.top = coords.top + WIDTH_HEIGHT_CELL * i + 'px';
    }
  }
  
}


function searchIndexTarget(target) {
  for(var i = 0; i < divsList.length; i++) {
  	if(divs(i) === target) {
  	  return i;
  	}
  }
  return null;
}

function searchIndexNeighborWithNULL(indexOfTarget) {
  for(var i in neighbor) {

  	var index = indexOfTarget + neighbor[i];

  	
  	if(neighbor[i] > 0) {

      if(index < divsList.length && divs(index).innerHTML == 0) {
        return index;
      }

    } else if(neighbor[i] < 0) {

      if(index >= 0 && divs(index).innerHTML == 0) {
        return index;
      }

	}

	}
	return null;
}

function showWin() {
  var win = document.createElement('div');

  win.style.cssText = 'width: 200px; height: 200px; background-color: lightgreen; position: absolute;' +
  'color: red; border: 1px solid #d6e9c6; border-radius: 4px; z-index: 101; cursor: pointer; font-size: 2.5em;';
  win.innerHTML = "You WIN!";
  win.id = 'win';

  win.style.left = 400 + 'px';
  win.style.top = 100 + 'px';

  document.body.appendChild(win);

  blockTable();

  return win;
}

function blockTable() {
  var block = document.createElement('div');

  block.style.cssText = 'position: absolute; z-index: 100; width: 1000px; height: 500px; left: 0; top: 0;';
  block.id = 'block';

  document.body.appendChild(block);
}

function divs(index) {
  for(var i = 0; i < divsList.length; i++) {
    if(divsList[i].value == index) {
      return divsList[i];
    }
  }
}

/*
function checkForCapabilityTransitionBetweenFloor(target, neighbor) { //проверяет на корректность перехода между этажами, чтобы
																	//нельзя было из конца одной строки шагнуть на начало другой
  if((neighbor % 4) == 0 && neighbor != 0 && target == neighbor - 1)
  	return false;
  else return true;
}
*/

var neighbor = {
	right: 1,
	left: -1,
	top: -4,
	bottom: 4
};




/*
var winMessage = document.createElement('div');

winMessage.style.cssText = 'position: fixed; color: red; z-index: 100';

winMessage.style.left = document.documentElement.clientWidth / 2 + 'px';
winMessage.style.top = document.documentElement.clientHeight / 2 + 'px';

winMessage.innerHTML = 'WIN!';
*/