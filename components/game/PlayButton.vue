<template>
  <v-card justify="center" align="center" class="justify-center align-center mx-auto my-auto" max-width="fit-content">

    <v-card-title class="accent--text retroFont">
      Press start to play
    </v-card-title>

    <v-row align="center" @click="openGrid()" class="justify-center mx-2 my-2">
      <div class="my-2 text-center">
        <v-btn x-large color=Green class="retroFont play-button" dark>
          Start
        </v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import { Howl } from 'howler'
import coinSfx from '@/assets/audio/coinSfx.wav';
import startSfx from '@/assets/audio/startSfx.wav';

var coinSound = new Howl({
  src: [coinSfx],
  volume: 0.2,
  html5: true
});

var startSound = new Howl({
  src: [startSfx],
  volume: 0.2,
  html5: true
});

export default {
  props: {
    value: Boolean
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
  },
  methods: {
    // Start application and play sound effects
    openGrid() {
      coinSound.play();
      this.showGrid = true;
      setTimeout(() => {
            startSound.play();
          }, "1500")
    },
  },
}

</script>