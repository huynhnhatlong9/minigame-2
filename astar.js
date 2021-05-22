let a = [
  [0, 0, 1, 1, 0, 1, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
];
/*
node : {
    x:,
    y:,
    g,
    h,
    path
}
*/
function findPath(begin, end, arr) {
  let closet = [];
  let open = [begin];
  while (open.length > 0) {
    open.sort((a, b) => {
      return a > b ? 1 : a < b ? -1 : 0;
    });
    var tmp = open.shift();
    console.log("tmp", tmp.x, tmp.y);
    if (tmp.x == end.x && tmp.y == end.y) {
      return tmp;
    }
    var closetContain = isArrayContainElement(tmp, closet);
    if (closetContain == null) {
      closet.push(tmp);
      var neighbor = findNeighbor(tmp, arr, begin, end);
      neighbor.map((ele) => {
        if (isArrayContainElement(ele, closet) == null) {
          var existPoint = isArrayContainElement(ele, open);
          if (!existPoint) {
            open.push(ele);
          } else {
            if (ele.h + ele.g < existPoint.h + existPoint.g) {
              existPoint.h = ele.h;
              existPoint.g = ele.g;
              existPoint.path = tmp.path.concat([[tmp.x, tmp.y]]);
            }
          }
        }
      });
      console.log("open", open);
    }
    console.log("-----");
  }
}

isArrayContainElement = (ele, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (ele.x == arr[i].x && ele.y == arr[i].y) {
      return arr[i];
    }
  }
  return null;
};

function findNeighbor(point, array, begin, end) {
  var result = [];
  var up_point = {
    x: point.x - 1,
    y: point.y,
    h: _h([point.x - 1, point.y], [end.x, end.y]),
    g: point.g + 1,
    path: point.path.concat([[point.x, point.y]]),
  };
  var down_point = {
    x: point.x + 1,
    y: point.y,
    h: _h([point.x + 1, point.y], [end.x, end.y]),
    g: point.g + 1,
    path: point.path.concat([[point.x, point.y]]),
  };
  var right_point = {
    x: point.x,
    y: point.y + 1,
    h: _h([point.x, point.y + 1], [end.x, end.y]),
    g: point.g + 1,
    path: point.path.concat([[point.x, point.y]]),
  };
  var left_point = {
    x: point.x,
    y: point.y - 1,
    h: _h([point.x, point.y - 1], [end.x, end.y]),
    g: point.g + 1,
    path: point.path.concat([[point.x, point.y]]),
  };
  if (isValidPoint(left_point, array)) {
    result.push(left_point);
  }
  if (isValidPoint(right_point, array)) {
    result.push(right_point);
  }
  if (isValidPoint(up_point, array)) {
    result.push(up_point);
  }
  if (isValidPoint(down_point, array)) {
    result.push(down_point);
  }
  return result;
}

function _h(p1, p2) {
  return p2[0] - p1[0] + p2[1] - p1[1];
}

function isValidPoint(point, array) {
  if (
    point.x >= 0 &&
    point.y >= 0 &&
    point.x < array.length &&
    point.y < array[0].length &&
    array[point.x][point.y] == 0
  ) {
    return true;
  }
  return false;
}

var result = findPath(
  {
    x: 0,
    y: 6,
    h: 12,
    g: 0,
    path: [],
  },
  {
    x: 6,
    y: 6,
    h: 0,
    g: 12,
    path: [],
  },
  a
);

console.log(result);
