<template>
    <Header @filter="search" />
    <BookModal :showModal="showModal" :book="book" @close="showModal = false" />
    <div class="home">
        <div class="no-books" v-if="isLoading">
            <Loading />
        </div>
        <div class="books" v-else-if="books.length">
            <Book v-for="book in books" :book="book" :key="book" @show="show" />
        </div>
        <div class="no-books" v-else>
            <i class="bi bi-emoji-frown-fill" />
            <p class="no-books-message">Not Found</p>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';

    import Book from '@/components/Book.vue';

    import Loading from '@/components/Loading.vue';

    import BookModal from '@/components/BookModal.vue';

    import { controller } from '@/controller/controller';

    export default {
        components: { Header, Book, Loading, BookModal },
        data() {
            return {
                isLoading: true,
                title: '',
                books: [],
                book: {},
                showModal: false
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
            show(book) {
                this.book = book;
                this.showModal = true
            }
        },
        async beforeMount() {
            await this.search();
        },
    }
</script>

<style scoped>
    .home {
        height: calc(100vh - 86.4px);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .books {
        background: rgb(250, 250, 250);
        border: 1px solid rgb(230, 230, 230);
        border-radius: 8px;
        padding: 36px;

        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        width: 840px;

        gap: 20px;
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