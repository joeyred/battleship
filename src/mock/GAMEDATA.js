const GAMEDATA = {
  players: [

    // PLAYER 1
    {
      misses: [
        [0, 4],
        [6, 0],
        [5, 4],
        [7, 3],
      ],
      hits: [
        [5, 6],
        [5, 5],
        [3, 2]
      ],
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
            [4, 2],
            [4, 3],
            [4, 4]
          ],
          damage: [],
          placed: true
        },
        {
          name: 'Submarine',
          size: 3,
          direction: '',
          locations: [
            [1, 7],
            [1, 8],
            [1, 9]
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
    },

    ///////////////
    // PLAYER 2 //
    //////////////
    {
      misses: [
        [0, 0],
        [2, 6],
        [3, 0],
        [9, 1]
      ],
      hits: [
        [6, 8],
        [4, 6],
        [6, 6]
      ],
      ships: [
        {
          name: 'Carrier',
          size: 5,
          direction: '',
          locations: [
            [2, 1],
            [2, 2],
            [2, 3],
            [2, 4],
            [2, 5]
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
            [4, 2],
            [4, 3],
            [4, 4]
          ],
          damage: [],
          placed: true
        },
        {
          name: 'Submarine',
          size: 3,
          direction: '',
          locations: [
            [1, 7],
            [1, 8],
            [1, 9]
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
