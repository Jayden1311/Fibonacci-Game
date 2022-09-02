<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
            <v-card-title class="text-h5 accent--text">
                Credits
            </v-card-title>

            <v-divider></v-divider>

            <v-list>
                <v-list-item-group color="primary">
                    <v-list-item v-for="(item, i) in items" :key="i" @click="goToLink(item.url)">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
                Made by Jayden van den Bosch
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click.stop="show = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        items: [
            { text: 'Linkedin - Jayden van den Bosch', icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/jayden-v-09a685198/' },
            { text: 'Github - Jayden1311', icon: 'mdi-github', url: "https://github.com/Jayden1311" }
        ],
    }),
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
    },
    methods: {
        goToLink(url) {
            window.open(url);
        },
    },
}
</script>