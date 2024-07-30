<template>
    <div class="book">
        <transition name="fade" mode="out-in" @afterLeave="changeView('order')">
            <div class="book-info" v-if="view === 'info'">
                <img class="img" :src="url">
                <div class="text">
                    <div class="info">
                        <p>Título:</p>
                        <p>{{ book.title }}</p>
                    </div>
                    <div class="info">
                        <p>Autor(a):</p>
                        <p>{{ book.writer }}</p>
                    </div>
                    <div class="info">
                        <p>Gênero:</p>
                        <p>{{ book.genre }}</p>
                    </div>
                    <div class="info">
                        <p>Editora:</p>
                        <p>{{ book.publisher }}</p>
                    </div>
                    <div class="order" @click="changeView('')">
                        <i class="bi bi-box-seam-fill" />
                        <p>Pedir livro</p>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <form class="book-order" v-if="view === 'order'">
                <p>Opções de retirada</p>
                <div>
                    <input type="radio" name="method" id="fretagem">
                    <label for="fretagem" class="method">Fretagem</label>
                </div>
                <div>
                    <input type="radio" name="method" id="retirada">
                    <label for="retirada" class="method">Retirada</label>
                </div>
            </form>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            book: { type: Object, required: true }
        },
        data() {
            return {
                showModal: false,
                book: this.$props.book,
                url: '',
                view: 'info'
            }
        },
        methods: {
            changeView(name) {
                this.view = name;
            }
        },
        beforeMount() {
            const buffer = new Uint8Array(this.book.image.data);
            const blob = new Blob([buffer], { type: 'image/jpg' });
            this.url = URL.createObjectURL(blob);
        }
    }
</script>

<style scoped>

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s, transform 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(-20px);
    }

    .book {
        background: rgb(250, 250, 250);
        padding: 36px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 8px;
    }

    .book-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        gap: 72px;

        width: fit-content;
        height: auto;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .info {
        font-size: 18px;
        font-weight: 500;

        display: flex;
        flex-direction: row;
        gap: 16px;

        color: rgb(4, 124, 108);
    }

    .img {
        height: 194.5px;
        width: 145.875px;
        border-radius: 8px;
    }

    .order {
        font-size: 18px;
        font-weight: 500;

        display: flex;
        flex-direction: row;
        align-items: center;
        align-self: flex-end;
        gap: 8px;

        color: rgb(4, 124, 108);
    }

    .bi-box-seam-fill {
        font-size: 24px;
    }

    .order:hover {
        transition: 0.25s;
        filter: brightness(80%);
        cursor: pointer;
    }

    .book-order {
        font-size: 18px;
        font-weight: 500;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        color: rgb(4, 124, 108);
    }

    .method {
        margin: 0 0 0 12px;
    }
</style>