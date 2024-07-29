<template>
    <ModalLogin :showModal="showModalLogin" @close="show(false)" @login="login" />
    <div class="header">
        <div class="align">
            <div class="group title" @click="home">
                <i class="bi bi-book-half" />
                <p>donbo</p>
            </div>
            <div class="search-bar">
                <input class="search-input" type="text" id="search" autocomplete="off" placeholder="O que você procura?"
                    v-model="title" @keydown.enter="search">
                <label class="search" for="search"><i class="bi bi-search" @click="search" /></label>
            </div>
        </div>
        <div>
            <div class="group login" @click="show(true)">
                <i class="bi bi-person-fill" />
                <div v-if="userState">
                    <p>{{ this.username }}</p>
                </div>
                <div v-else>
                    <p>Login</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ModalLogin from './ModalLogin.vue';

export default {
    components: { ModalLogin },
    data() {
        return {
            title: '',
            showModalLogin: false,
            userState: false,
            username: ''
        }
    },
    methods: {
        home() {
            this.title = '';
            this.$emit('filter', this.title);
        },
        search() {
            this.$emit('filter', this.title);
        },
        show(state) {
            this.showModalLogin = state;
        },
        login(state, username) {
            this.userState = state;
            this.username = username;
            this.showModalLogin = false;
        }
    },
    emits: ['filter']
}
</script>

<style scoped>
.header {
    background: rgb(28, 160, 208);
    color: rgb(237, 231, 231);

    padding: 18px 32px;
    border-bottom: 1px solid rgb(18, 150, 198);
    /* border-radius: 0 0 16px 16px; */

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.align {
    display: flex;
    gap: 24px;
}

.group {
    font-size: 28px;
    text-transform: capitalize;
    font-weight: 500;

    display: flex;
    gap: 12px;
    align-items: center;
}

.group:hover {
    cursor: pointer;
}

.title:hover {
    transition: 0.5s;
    filter: brightness(80%);
}

.search-bar {
    display: flex;
    align-items: center;
}

.search-input {
    padding: 12px 40px 12px 12px;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 8px;
    outline: none;

    color: rgb(150, 150, 150);
}

.bi-search {
    font-size: 24px;
    color: rgb(150, 150, 150);
    width: 0;
    position: relative;
    right: 40px;
}

.bi-search:hover {
    transition: 0.5s;
    filter: brightness(80%);
    cursor: pointer;
}

.login {
    color: rgb(237, 231, 231);
    font-size: 24px;
    gap: 8px;
}

.login:hover {
    transition: 0.5s;
    filter: brightness(80%);
}
</style>