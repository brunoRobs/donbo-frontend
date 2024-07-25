<template>
    <div class="login" v-if="!signUp">
        <input class="input" type="text" autocomplete="off" placeholder="usuário" v-model="username">
        <input class="input" type="password" autocomplete="off" placeholder="senha" v-model="password">
        <div class="options">
            <i title="Criar conta" class="bi bi-plus-circle-fill" @click="registerMode(true)" />
            <i title="Acessar" class="bi bi-check-circle-fill" @click="login" />
        </div>
    </div>
    <div v-else class="register">
        <div class="fields">
            <transition name="fade" mode="out-in" @afterLeave="changeField('address')">
                <div v-if="field === 'userData'" class="group userData">
                    <input class="input" type="text" autocomplete="off" placeholder="primeiro nome"
                        v-model="userData.firstName">
                    <input class="input" type="text" autocomplete="off" placeholder="último nome"
                        v-model="userData.lastName">
                    <input class="input" type="date" autocomplete="off" placeholder="data de nascimento"
                        v-model="userData.birthDate">
                    <input class="input" type="text" autocomplete="off" placeholder="CPF" v-model="userData.cpf">
                    <i class="bi bi-arrow-right-circle-fill register" @click="changeField('')" />
                </div>
            </transition>
            <transition name="fade" mode="out-in" @afterLeave="changeField('credentials')">
                <div v-if="field === 'address'" class="group">
                    <div class="group address">
                        <div class="group">
                            <input class="input" type="text" autocomplete="off" placeholder="país"
                                v-model="address.country">
                            <input class="input" type="text" autocomplete="off" placeholder="estado"
                                v-model="address.countryState">
                            <input class="input" type="text" autocomplete="off" placeholder="cidade"
                                v-model="address.city">
                            <input class="input" type="text" autocomplete="off" placeholder="bairro"
                                v-model="address.neighborhood">
                        </div>
                        <div class="group">
                            <input class="input" type="text" autocomplete="off" placeholder="logradouro"
                                v-model="address.street">
                            <input class="input" type="text" autocomplete="off" placeholder="número"
                                v-model="address.streetNumber">
                            <input class="input" type="text" autocomplete="off" placeholder="complemento"
                                v-model="address.complement">
                            <input class="input" type="text" autocomplete="off" placeholder="CEP"
                                v-model="address.zipCode">
                        </div>
                    </div>
                    <i class="bi bi-arrow-right-circle-fill register" @click="changeField('')" />
                </div>
            </transition>
            <div v-if="field === 'credentials'" class="group credentials">
                <input class="input" type="text" autocomplete="off" placeholder="usuário"
                    v-model="credentials.username">
                <input class="input" type="text" autocomplete="off" placeholder="e-mail" v-model="credentials.email">
                <input class="input" type="password" autocomplete="off" placeholder="senha"
                    v-model="credentials.password">
                <input class="input" type="password" autocomplete="off" placeholder="confirme sua senha"
                    v-model="confirmPassword">
                <i title="Criar conta" class="bi bi-plus-circle-fill register" @click="register" />
            </div>
        </div>
    </div>
</template>

<script>
    import { controller } from '@/controller/controller';

    export default {
        data() {
            return {
                credentials: {
                    username: '',
                    password: '',
                    email: ''
                },
                userData: {
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    cpf: ''
                },
                address: {
                    country: '',
                    countryState: '',
                    city: '',
                    neighborhood: '',
                    street: '',
                    streetNumber: '',
                    complement: '',
                    zipCode: ''
                },
                confirmPassword: '',
                field: 'userData',
                signUp: false,
                username: '',
                password: ''
            }
        },
        methods: {
            registerMode(state) {
                this.signUp = state;
            },
            changeField(name) {
                this.field = name;
            },
            async register() {
                const response = await controller.register(this.credentials, this.userData, this.address);
                if (response) this.$toast.success('Usuário criado', this.$toast.settings);
                else this.$toast.error('Algo deu errado', this.$toast.settings);
            },
            async login() {
                const response = await controller.login(this.username, this.password);
                if (response) {
                    this.$emit('login', this.username);
                    this.$toast.success(`Boas vindas, ${this.username}`, this.$toast.settings);
                }
                else this.$toast.error('Algo deu errado', this.$toast.settings);
            }
        },
        emits: ['login']
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

    .login {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .register {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .fields {
        display: flex;
        gap: 24px;
    }

    .group {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .group.address {
        flex-direction: row;
    }

    .bi.register {
        align-self: flex-end;
    }

    .input {
        padding: 12px 40px;
        border: 1px solid rgb(240, 240, 240);
        border-radius: 8px;

        text-align: center;

        outline: none;

        color: rgb(150, 150, 150);
    }

    .options {
        display: flex;
        justify-content: space-around;
    }

    .bi {
        font-size: 24px;
    }

    .bi:hover {
        transition: 0.5s;
        filter: brightness(80%);
        cursor: pointer;
    }

    .bi-check-circle-fill {
        color: rgb(28, 160, 208);
    }

    .bi-arrow-right-circle-fill {
        color: rgb(28, 160, 208);
    }

    .bi-plus-circle-fill {
        color: rgb(50, 208, 66);
    }
</style>