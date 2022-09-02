<template>
  <v-app id="fibonacci">
    <v-app-bar app>
      <v-toolbar-title class="ml-2 retroFont accent--text">Fibonacci game</v-toolbar-title>
      <v-btn icon class="ml-2" @click="showGameDialog = true">
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="showSettingsDialog = true">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon @click="showCreditsDialog = true">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <game-dialog v-model="showGameDialog" />
      <credits-dialog v-model="showCreditsDialog" />
      <settings-dialog v-model="showSettingsDialog" @saveSettings="updateSettings" />
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col>
            <Transition name="fade" mode="out-in">
              <play-button v-if="!showGrid" v-model="showGrid" />
              <grid v-else-if="showGrid" :gridSettings="gridSettings" />
            </Transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GameDialog from "../components/utils/GameDialog.vue";
import SettingsDialog from "../components/utils/SettingsDialog.vue"
import CreditsDialog from "../components/utils/CreditsDialog.vue"
import PlayButton from "../components/game/PlayButton.vue";
import Grid from "../components/game/Grid.vue";

export default {
  data() {
    return {
      // initial settings
      showGameDialog: false,
      showCreditsDialog: false,
      showSettingsDialog: false,
      showGrid: false,
      gridSettings: {
        width: 25,
        height: 25,
      },
    }
  },
  components: {
    "credits-dialog": CreditsDialog,
    "game-dialog": GameDialog,
    "settings-dialog": SettingsDialog,
    "grid": Grid,
    "play-button": PlayButton,
  },
  methods: {
    // Updates the grid settings when the user changes them in the settings dialog
    updateSettings(updatedSettings) {
      this.gridSettings.width = updatedSettings.width
      this.gridSettings.height = updatedSettings.height
    }
  },
};
</script>

<style>
.retroFont {
  font-family: 'Press Start 2P';
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>