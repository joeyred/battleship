const GAMEDATA = {
  players: [
    {
      ships: [
        {
          name: 'Carrier',
          size: 5,
          direction: '',
          locations: [
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5]
          ],
          damage: [],
          placed: true
        },
        {
          name: 'Battleship',
          size: 4,
          direction: '',
          locations: [
            [3, 6],
            [4, 6],
            [5, 6],
            [6, 6]
          ],
          damage: [
            [4, 6],
            [6, 6]
          ],
          placed: true
        },
        {
          name: 'Cruiser',
          size: 3,
          direction: '',
          locations: [
            [3, 3],
            [3, 4],
            [3, 5]
          ],
          damage: [],
          placed: true
        },
        {
          name: 'Submarine',
          size: 3,
          direction: '',
          locations: [
            [1, 9],
            [1, 8],
            [1, 7]
          ],
          damage: [],
          placed: true
        },
        {
          name: 'Destroyer',
          size: 2,
          direction: '',
          locations: [
            [6, 8],
            [7, 8]
          ],
          damage: [
            [6, 8]
          ],
          placed: true
        }
      ]
    }
  ]
};
export default GAMEDATA;
