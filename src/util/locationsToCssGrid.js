function locationsToCssGrid(locations) {
  let xStart,
    xEnd,
    yStart,
    yEnd;

  // This handles things if just an array with one
  // set of coordinates are passed
  if (typeof locations[0] === 'number') {
    console.log('one location');
    xStart = locations[0] + 1;
    xEnd = locations[0] + 2;
    yStart = locations[1] + 1;
    yEnd = locations[1] + 2
  }
  // handles an array of arrays that contain coordinates
  if (typeof locations[0] === 'object') {
    console.log('lots of locations');
    xStart = locations[0][0] + 1;
    yStart = locations[0][1] + 1;

    xEnd = locations[locations.length - 1][0] + 2;
    yEnd = locations[locations.length - 1][1] + 2;
    for (let i = 0; i < locations.length; i++) {

    }
  }
  // [Column String, Row String]
  return `${yStart} / ${xStart} / ${yEnd} / ${xEnd}`;
}

export default locationsToCssGrid;
