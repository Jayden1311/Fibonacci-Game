<template>
    <v-dialog v-model="show" max-width="700px">
        <v-card>
            <v-card-title class="text-h5 accent--text">
                How to play?
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="accent--text text-h5 my-4">
                You have a 50x50 grid with the following rules
                <ul class="my-4">
                <li>When the player clicks on one of the cells, all horizontal and vertical cells of the clicked cell will be incremented by 1 if the cell was empty then it will be 1.</li>
                <li>After each cell change, the cell will be highlighted for a split second.</li>
                <li>When 5 consecutive numbers from the Fibonacci series are next to each other the cells will be briefly higlighted and cleared. An example : for example 1.1.2.3.5 </li>
                </ul>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                Goodluck and have fun!
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click.stop="show=false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    // Shows the dialog when the prop passed to the component is true
    computed: {
        show: {
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