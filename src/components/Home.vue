<template>
    <Header @search="search" @type="filterByType" @genre="filterByGenre" @subject="filterBySubject" />
    <div class="home">
        <div class="no-books" v-if="isLoading">
            <Loading />
        </div>
        <div class="books" v-else-if="books.length">
            <div v-for="(book, index) in books">
                {{ set(null, false) }}
                <ModalBook :book="book" :showModal="showModal[index]" @close="set(index, false)" :key="book.id" />
                <div class="book" @click="set(index, true)" :key="book.id">
                    <div class="title">
                        {{ book.title }}
                    </div>
                    <div class="writer" v-if="book.writer">
                        {{ book.writer }}
                    </div>
                    <div class="publisher" v-else>
                        {{ book.publisher }}
                    </div>
                </div>
            </div>
        </div>
        <div class="no-books" v-else>
            <i class="bi bi-emoji-frown-fill" />
            <p class="no-books-message">Not Found</p>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';

    import Loading from '@/components/Loading.vue';

    import ModalBook from '@/components/ModalBook.vue';

    import { controller } from '@/controller/controller';

    export default {
        components: { Header, Loading, ModalBook },
        data() {
            return {
                isLoading: true,
                title: '',
                books: [],
                showModal: []
            }
        },
        methods: {
            async search(title) {
                this.isLoading = true;
                await controller.search(title).then(response => {
                    this.books = response;
                });
                this.isLoading = false;
            },
            async filterByType(type) {
                this.isLoading = true;
                await controller.filterByType(type).then(response => {
                    this.books = response;
                });
                this.isLoading = false;
            },
            async filterByGenre(genre) {
                this.isLoading = true;
                await controller.filterByGenre(genre).then(response => {
                    this.books = response;
                });
                this.isLoading = false;
            },
            async filterBySubject(subject) {
                this.isLoading = true;
                await controller.filterBySubject(subject).then(response => {
                    this.books = response;
                });
                this.isLoading = false;
            },
            show(index) {
                this.showModal[index] = true;
            },
            set(index, state) {
                if (index === null) this.showModal.push(state);
                else this.showModal[index] = state;
            }
        },
        async beforeMount() {
            await this.search();
        }
    }
</script>

<style scoped>
    .home {
        background: rgb(52, 30, 129);

        height: calc(100vh - 86.4px);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .books {
        background: rgb(99, 89, 204);
        border: 1px solid rgb(79, 100, 211);
        border-radius: 8px 0 0 8px;
        padding: 36px;

        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        max-height: 80%;
        width: 840px;

        gap: 20px;

        overflow-y: auto;

        scrollbar-width: thin;
    }

    .book {
        background: rgb(255, 255, 255);
        border: 1px solid rgb(235, 235, 235);
        border-radius: 8px;
        padding: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 116px;
        width: 176px;

        gap: 8px;

        transition: 0.5s;
    }

    .book:hover {
        cursor: pointer;
        filter: brightness(90%);
    }

    .title {
        font-size: 16px;
        font-weight: 600;
        text-align: center;

        color: rgb(4, 124, 108);
    }

    .writer {
        font-size: 10px;
        font-weight: 500;

        color: rgb(4, 124, 108);
    }

    .publisher {
        font-size: 10px;
        font-weight: 500;

        color: rgb(4, 124, 108);
    }

    .no-books {
        background: rgb(250, 250, 250);
        border: 1px solid rgb(230, 230, 230);
        border-radius: 8px;
        padding: 36px;

        display: flex;
        align-items: center;
        flex-direction: column;

        gap: 20px;
    }

    .bi-emoji-frown-fill {
        font-size: 60px;
    }

    .no-books-message {
        font-size: 32px;
    }
</style>