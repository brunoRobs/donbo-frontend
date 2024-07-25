<template>
    <transition name="fade" mode="out-in">
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <i title="Fechar" class="bi bi-x-lg" @click="closeModal()" />
                <div class="component">
                    <p>{{ book.titulo }}</p>
                    <p>{{ book.autor }}</p>
                    <p>{{ book.editora }}</p>
                    <p>{{ book.genero }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                required: true
            },
            book: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                book: this.$props.book[0]
            }
        },
        methods: {
            closeModal() {
                this.book = {};
                this.$emit('close');
            }
        },
        emits: ['close']
    };
</script>

<style scoped>

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    p {
        font-size: 24px;
        text-align: center;
    }

    .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: rgb(240, 240, 240);
        padding: 20px;
        display: flex;
        align-items: flex-end;
        border-radius: 8px;
        width: fit-content;
    }

    .bi-x-lg {
        color: rgb(236, 111, 111);
        font-size: 24px;
    }

    .bi-x-lg:hover {
        cursor: pointer;
        transition: 0.5s;
        filter: brightness(80%);
    }

    .component {
        margin: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
</style>