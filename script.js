var divs = document.querySelectorAll('.child');
var divParent = document.querySelector('.parent');
var restart = document.querySelector('.restart');
var test1 = document.querySelector('.test1');
var test2 = document.querySelector('.test2');

//divs[0].style.opacity = 0;
//divs[0].innerHTML = 0;

createTable();

/*
for(var i = 0; i < divs.length; i++) {
  divs[i].innerHTML = i;
}
*/
test2.onclick = function() {
  for(var i = 2; i < divs.length; i++) {
  	divs[i].style.opacity = 1;
    divs[i].innerHTML = i;
  }

  divs[1].innerHTML = 0;
  divs[1].style.opacity = 0;

  divs[0].innerHTML = 1;
}

test1.onclick = function() {
  for(var i = 0; i < divs.length - 2; i++) {
  	divs[i].style.opacity = 1;
    divs[i].innerHTML = i+1;
  }

  divs[divs.length - 2].innerHTML = 0;
  divs[divs.length - 2].style.opacity = 0;

  divs[divs.length - 1].innerHTML = 15;
}

restart.onclick = function() {
  for (var i = 0; i < divs.length; i++) {
  	divs[i].style.opacity = 1;
  	divs[i].innerHTML = null;
  }

  createTable();
}

divParent.onclick = function(event) {
  var target = event.target;

  var indexOfTarget = searchIndexTarget(target);
  var indexNeighborWithNULL = searchIndexNeighborWithNULL(indexOfTarget);

  if(indexNeighborWithNULL != null) {
    divs[indexNeighborWithNULL].innerHTML = divs[indexOfTarget].innerHTML;
  	divs[indexNeighborWithNULL].style.opacity = 1;
  	divs[indexOfTarget].style.opacity = 0;
  	divs[indexOfTarget].innerHTML = 0;
  }

  if(checkWin() === true) {
  	alert("WIN!");
  }
}

function checkWin() {
  for (var i = 0; i < divs.length-1; i++) {
  	for (var j = i+1; j < divs.length-1; j++) {
  	  if(+divs[i].innerHTML > +divs[j].innerHTML) {
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

  for(var i = 0; i < divs.length; i++) {
    arr[i] = i;
  }

  for(var i = 0, j = 14; i < divs.length; i++, j--) {
    randIndex = Math.floor(Math.random() * (j + 1));

    divs[i].innerHTML = arr[randIndex];

    if(arr.length - 1 != randIndex) {
      temp = arr[arr.length - 1];
      arr.pop();
      arr[randIndex] = temp;
    }
    else if(arr.length - 1 == randIndex) {
      arr.pop();
    }
  }

  for (var i = 0; i < divs.length; i++) {
  	if(divs[i].innerHTML == 0) {
  	  divs[i].style.opacity = 0;
  	  break;
  	}

  }
}


function searchIndexTarget(target) {
  for(var i = 0; i < divs.length; i++) {
  	if(divs[i] === target) {
  	  return i;
  	}
  }
}

function searchIndexNeighborWithNULL(indexOfTarget) {
  for(var i in neighbor) {

  	var index = indexOfTarget + neighbor[i];

  	
  	if(neighbor[i] > 0) {

      if(index < divs.length && divs[index].innerHTML == 0) {
        return index;
      }

    } else if(neighbor[i] < 0) {

      if(index >= 0 && divs[index].innerHTML == 0) {
        return index;
      }

	}
	else return null;

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

document.body.style.zoom = screen.width/1000;
