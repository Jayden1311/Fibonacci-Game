<template>
    <v-dialog v-model="show" max-width="700px">
        <v-card>
            <v-card-title class="text-h5 accent--text">
                Game options
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="accent--text text-h5 my-4">
                <v-slider v-model="height.value" :min="height.min" :max="height.max" label="Height" class="align-center">
                    <template v-slot:append>
                        <v-text-field :min="height.min" :max="height.max" v-model="height.value" class="mt-0 pt-0" type="number" style="width: 60px"></v-text-field>
                    </template>
                </v-slider>
                <v-slider v-model="width.value" :min="width.min" :max="width.max" label="Width" class="align-center">
                    <template v-slot:append>
                        <v-text-field :min="width.min" :max="width.max" v-model="width.value" class="mt-0 pt-0" type="number" style="width: 60px"></v-text-field>
                    </template>
                </v-slider>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                Resetting the grid will restart the game and reset the score.
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="saveSettings" @click.stop="show = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    data() {
        return {
            height: {
                value: 25,
                min: 10,
                max: 50
            },
            width: {
                value: 25,
                min: 10,
                max: 50
            }
        }
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
    },
    methods: {
        saveSettings() {
            this.$emit('saveSettings', {
                width: this.width.value,
                height: this.height.value
            })
        }
    },
}
</script>