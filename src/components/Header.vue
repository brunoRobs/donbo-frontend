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
            <select class="filter" v-model="type">
                <option class="option" value="Todos">Todos</option>
                <option class="option" value="literature">Literatura</option>
                <option class="option" value="academic">Acadêmico</option>
            </select>
            <select class="filter" v-model="genre" v-if="type === 'literature'">
                <option class="option" value="Todos">Todos</option>
                <option class="option" v-for="genre in genreList" :value="genre" :key="genre">{{ genre }}</option>
            </select>
            <select class="filter" v-model="subject" v-if="type === 'academic'">
                <option class="option" value="Todos">Todos</option>
                <option class="option" v-for="subject in subjectList" :value="subject" :key="subject">{{ subject }}
                </option>
            </select>
        </div>
        <div>
            <div class="group login" :class="userState ? 'logged' : 'no-logged'" @click="show(true)">
                <i class="bi bi-person-fill" />
                <div v-if="userState">
                    <p class="user">{{ this.username }}</p>
                </div>
                <div v-else>
                    <p>Login</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { controller } from '@/controller/controller';

    import ModalLogin from './ModalLogin.vue';

    export default {
        components: { ModalLogin },
        data() {
            return {
                title: '',
                type: 'Todos',
                genre: 'Todos',
                genreList: [],
                subject: 'Todos',
                subjectList: [],
                showModalLogin: false,
                userState: false,
                username: ''
            }
        },
        watch: {
            type(newValue) {
                this.$emit('type', newValue);
            },
            genre(newValue) {
                this.$emit('genre', newValue);
            },
            subject(newValue) {
                this.$emit('subject', newValue);
            }
        },
        methods: {
            home() {
                this.title = '';
                this.$emit('search', this.title);
            },
            search() {
                if (this.title) this.$emit('search', this.title);
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
        async beforeMount() {
            this.genreList = await controller.genreList().then(response => {
                return response.map(obj => obj.genre);
            });
            this.subjectList = await controller.subjectList().then(response => {
                return response.map(obj => obj.subject);
            })
        },
        emits: ['search', 'type', 'genre', 'subject']
    }
</script>

<style scoped>
    .header {
        background: rgb(99, 89, 204);
        color: rgb(237, 231, 231);

        padding: 18px 32px;
        border-bottom: 1px solid rgb(79, 69, 184);
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

        color: rgb(4, 124, 108);
    }

    .search {
        display: contents;
    }

    .bi-search {
        font-size: 24px;
        color: rgb(4, 124, 108);
        width: 0;
        position: relative;
        right: 40px;
    }

    .bi-search:hover {
        transition: 0.5s;
        filter: brightness(80%);
        cursor: pointer;
    }

    .filter {
        padding: 12px 40px 12px 12px;
        border: 1px solid rgb(240, 240, 240);
        border-radius: 8px;
        outline: none;

        color: rgb(4, 124, 108);

        cursor: pointer;
    }

    .option {
        margin: 10px 0 0 0;
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

    .user {
        text-transform: none;
    }
</style>