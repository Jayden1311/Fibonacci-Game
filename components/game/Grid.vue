<template>
  <v-card v-model="showGrid" class="mx-auto my-3" max-width="fit-content">

    <v-card-title class="accent--text retroFont">Fibonacci's found: {{ this.grid.fibonacciFound }}
      <v-spacer></v-spacer>
      <v-btn icon class="ml-2" @click="resetGrid()">
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider class="mx-4 mb-2"></v-divider>
    <v-row align="center" class="mx-0 my-2">
      <div id="GRID" class="mx-4">
        <table>
          <tbody>
            <tr v-for="row in grid.rows" :key="row.id">
              <td v-for="cells in row.cells" @click="incrementCell(cells.id)" :key="cells.id"
                :class="{ highlight: cells.highlight, fibonacciSequence: cells.fibonacciSequence }">
                {{ cells.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-row>
    <v-row align="center" class="mx-0">
      <v-spacer />
    </v-row>
  </v-card>
</template>

<script>
import { isPerfectSquare } from '@/assets/js/utils.js';
import { Howl } from 'howler'
import cellSfx from '@/assets/audio/cellSfx.mp3';
import clearSfx from '@/assets/audio/clearSfx.wav';
import fiboSfx from '@/assets/audio/fiboSfx.wav';

// Click cell sound effect
var cellSound = new Howl({
  src: [cellSfx],
  volume: 0.2,
  html5: true
});
// grid clear sound effect
var clearSound = new Howl({
  src: [clearSfx],
  volume: 0.2,
  html5: true
});
// Fibonacci found sound effect
var fiboSound = new Howl({
  src: [fiboSfx],
  volume: 0.2,
  html5: true
});

export default {
  data() {
    return {
      grid: {
        fibonacciFound: 0,
        rows: []
      },
    }
  },
  props: {
    value: Boolean,
    gridSettings: {
      width: Number,
      height: Number
    }
  },
  methods: {
    // create grid by setting up rows and cells using gridSettings set in parent component
    createGrid() {
      this.grid.rows = [];
      const width = this.gridSettings.width
      const height = this.gridSettings.height
      for (let i = 0; i < height; i++) {
        const rowId = i;
        const row = {
          id: rowId,
          cells: [],
        }
        for (let j = 0; j < width; j++) {
          const cellId = `${rowId}-${j}`;
          row.cells.push({
            id: cellId,
            value: "",
            highlight: false,
            fibonacci: false,
            fibonacciSequence: false,
          });
        }
        this.grid.rows.push(row);
      }
    },
    // Increment cell value and check grid for fibonacci sequences
    incrementCell(id) {
      const row = id.split("-")[0]
      const column = id.split("-")[1]
      cellSound.play();
      this.incrementHorizontal(row)
      this.incrementVertical(row, column)
      setTimeout(() => {
        this.resetHighlightedCells(row, column);
      }, "500")
      this.checkGrid()
    },
    // Loop trough horizontal cells and increment value
    incrementHorizontal(row) {
      for (let i = 0; i < this.gridSettings.width; i++) {
        const currentCell = this.grid.rows[row].cells[i]
        this.incrementValue(currentCell)
      }
    },
    // Loop trough vertical cells and increment value
    incrementVertical(row, column) {
      for (let i = 0; i < this.gridSettings.height; i++) {
        const currentCell = this.grid.rows[i].cells[column]
        if (currentCell === this.grid.rows[row].cells[column]) {
          continue
        }
        this.incrementValue(currentCell)
      }
    },
    // reset highlighted cells
    resetHighlightedCells(row, column) {
      for (let i = 0; i < this.gridSettings.width; i++) {
        const currentCell = this.grid.rows[row].cells[i]
        currentCell.highlight = false
      }
      for (let i = 0; i < this.gridSettings.height; i++) {
        const currentCell = this.grid.rows[i].cells[column]
        currentCell.highlight = false
      }
    },
    // Increment the value of the cell by 1
    incrementValue(currentCell) {
      const value = currentCell.value
      if (value === "" || value === "0") {
        currentCell.value = 1
      } else {
        const newValue = parseInt(value) + 1
        currentCell.value = newValue
      }
      currentCell.highlight = true
    },
    // Check if input is a fibonacci number
    isFiboValue(value) { 
      // value is a fibonacci number if it is a perfect square
      return isPerfectSquare(5 * (value * value) - 4) || isPerfectSquare(5 * (value * value) + 4);
    },
    // Take array input and check for fibonacci sequence
    isFiboSequence(array) {
      let isFiboSequence = true;
      array.forEach((value, i, arr) => {
        if (i < arr.length - 2) {
          if (arr[i] + arr[i + 1] !== arr[i + 2]) {
            isFiboSequence = false;
          }
        }
      });
      return isFiboSequence;
    },
    // Sets all cell values to "" and resets the highlight
    resetGrid() {
      this.grid.rows.map(row => {
        row.cells.map((currentCell, index, arr) => {
          currentCell.value = ""  
          currentCell.highlight = false
        })
      })
      this.grid.fibonacciFound = 0;
      clearSound.play();
    },
    // Check if the grid has a fibonacci sequence
    checkGrid() {
      let fiboFoundAmount = 0;
      this.grid.rows.forEach(row => {
        row.cells.forEach((currentCell, index, arr) => {
          // Check if the current cell is a fibonacci number and if its not the first cell in the row or the last cell in the row
          if (this.isFiboValue(currentCell.value) && currentCell.value > 1 && index >= 3 && index <= arr.length - 2) {
            currentCell.fibonacci = true
            // Map the row to an array and check if the array is a fibonacci sequence
            let slicedArray = [...Array(5).keys()].map((n) => {
              return arr[index + (n - 3)];
            });
            // Check if the sliced array is a fibonacci sequence and if it is, set the fibonacciSequence property to true
            const sequence = slicedArray.map(x => x.value);
            if (this.isFiboSequence(sequence)) {
              slicedArray.forEach(cell => {
                cell.fibonacciSequence = true
                setTimeout(() => {
                  cell.fibonacciSequence = false
                  cell.value = ""
                }, 100);
              })
              // Increment the fibonacciFound property
              fiboFoundAmount = fiboFoundAmount + 1;
            }
          }
        })
      })
      // play sound if any fibonacci sequences are found
      if (fiboFoundAmount > 0) {
        fiboSound.play();
        this.grid.fibonacciFound = this.grid.fibonacciFound + fiboFoundAmount;
      }
    }
  },
  mounted() {
    this.createGrid()
  },
  watch: {
    gridSettings: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.createGrid();
      }
    }
  },
  computed: {
    showGrid: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px #0000001a;
  empty-cells: show;
}

tbody tr:hover {
  background-color: $Black-light;
}

tbody td {
  position: relative;
  width: 27px;
  height: 27px;
  background-color: $Grey;
  color: $Black;
  text-align: center;
  border: 1px solid $Black;
  cursor: cell;
  transition: all .5s ease-in-out, border 0ms, outline 0ms;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

tbody td:hover {
  color: #ffff;
  outline: 2px solid $Green;
  border: 2px solid $Green;
  z-index: 1;
}

tbody td:hover:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -1000px;
  bottom: -1000px;
  background-color: #41453b49;
  z-index: -1;
  pointer-events: none;
}

.highlight {
  color: #ffff;
  background-color: $Green;
}

.fibonacciSequence {
  background-color: $Red;
  z-index: 1;
}
</style>