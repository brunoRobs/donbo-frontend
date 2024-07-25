<template>
    <div class="book" @click="$emit('show', book)">
        <p class="info">
            {{ book.titulo }}
            {{ book.autor }}
        </p>
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
                book: this.$props.book
            }
        },
        emits: ['show']
        // beforeMount() {
        //     const buffer = new Uint8Array(this.$props.image.data);
        //     const blob = new Blob([buffer], { type: 'image/jpg' });
        //     this.url = URL.createObjectURL(blob);
        // }
    }
</script>

<style scoped>
    .book {
        background: rgb(230, 230, 230, 0.5);
        padding: 18px;
        border: 1px solid rgb(200, 200, 200, 0.5);
        border-radius: 8px;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: center;
        align-items: center;

        gap: 10px;

        width: fit-content;

        transition: 0.5s;
    }

    .book:hover {
        filter: brightness(0.9);
        cursor: pointer;
    }

    .img {
        height: 136px;
        width: 100px;
    }

    .info {
        width: 144px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
    }
</style>