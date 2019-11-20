<template>
    <v-app>
        <v-container>
            <v-row v-if="success < 0">
                <v-col cols="12" sm="6" md="4">
                    <v-alert type="error">
                        {{ message }}
                    </v-alert>
                </v-col>
            </v-row>

            <template>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <span class="font-weight-light" style="font-size: 32px">Masuk Akun <span class="font-weight-medium"></span> </span>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Email" v-model="form.email"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field type="password" label="Kata sandi" v-model="form.password"></v-text-field>
                    </v-col>
                </v-row>

                <v-btn color="primary" style="margin-right: 20px" @click="login()">masuk</v-btn>
            </template>

        </v-container>
    </v-app>
</template>

<script>
    
    export default {
        data: () => ({

            success: 0,
            load: false,
            message: '',
            form: {
                email: '',
                password: ''
            },
            user: new FormData(),

        }),
        
        methods: {
            login() {
                var url = this.$apiUrl + "/";

                this.user = new FormData();
                this.user.append('email', this.form.email);
                this.user.append('password', this.form.password);


                this.$http.post(url, this.user).then(response => {
                    if (response.data.token) {
                        localStorage.setItem("token", response.data.token);
                            this.$router.push({ name: "UserController" });
                            } 
                            else {
                                this.message = "Invalid Username or Password!";
                                this.load = false;
                }
                });
            },
        },
    }

</script>